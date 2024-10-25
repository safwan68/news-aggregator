import axios from "axios";

// Result fields
interface Article {
  title: string;
  description: string;
  url: string;
  source?: { name: string };
  urlToImage?: string;
  author?: string;
}

const API_KEYS = {
  newsApi: "c5dee813641b46c591afc092d4118b4e",
  guardianApi: "859b4b36-158a-4ea8-a387-dfa410cc1f72",
  nyTimesApi: "hl2Cx2fy0zD1iZ3uBqj3kIwZY3v0UV6z",
};

// Utility function to construct query parameters
const buildQueryParams = (params: { [key: string]: string | undefined }) => {
  return Object.entries(params)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join("&");
};

// Generic function
const fetchFromApi = async (
  url: string,
  transform: (data: any) => Article[]
): Promise<Article[]> => {
  try {
    const response = await axios.get(url);
    return transform(response.data);
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return [];
  }
};

// APIs URL
const buildNewsApiUrl = (
  query: string,
  category: string,
  fromDate: string,
  toDate: string,
  author: string
) => {
  let baseUrl = "https://newsapi.org/v2/";
  baseUrl += category && category !== "All" ? "top-headlines" : "everything";

  const params = buildQueryParams({
    apiKey: API_KEYS.newsApi,
    q: query || "news",
    category: category !== "All" ? category : undefined,
    from: fromDate,
    to: toDate,
    author,
    sortBy: "popularity"
  });

  return `${baseUrl}?${params}`;
};

const buildGuardianApiUrl = (
  query: string,
  category: string,
  fromDate: string,
  toDate: string,
  author: string
) => {
  const params = buildQueryParams({
    "api-key": API_KEYS.guardianApi,
    q: query,
    "from-date": fromDate,
    "to-date": toDate,
    section: category !== "general" ? category : undefined,
    byline: author
  });

  return `https://content.guardianapis.com/search?show-fields=trailText,byline,thumbnail,headline&${params}`;
};

const buildNytApiUrl = (
  query: string,
  category: string,
  fromDate: string,
  toDate: string,
  author: string
) => {
  const params = buildQueryParams({
    "api-key": API_KEYS.nyTimesApi,
    q: query,
    begin_date: fromDate ? fromDate.replace(/-/g, "") : undefined,
    end_date: toDate ? toDate.replace(/-/g, "") : undefined,
    fq: category !== "general" ? category : undefined,
    "byline:": author,
    fl: "headline,web_url,byline,multimedia"
  });

  return `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&${params}`;
};


// Setting response 
const newsApiResponse = (data: any): Article[] =>
  data.articles.map((article: any) => ({
    title: article.title,
    description: article.description || "No description available",
    url: article.url,
    source: { name: article.source?.name || "Unknown" },
    urlToImage: article.urlToImage || "",
    author: article.author || "Unknown"
  }));

const guardianResponse = (data: any): Article[] =>
  data.response.results.map((result: any) => ({
    title: result.webTitle,
    description: result.fields?.trailText || "No description available",
    url: result.webUrl,
    source: { name: "The Guardian" },
    urlToImage: result.fields?.thumbnail || "",
    author: result.fields?.byline || "Unknown"
  }));

  const nytResponse = (data: any): Article[] =>
    data.response.docs.map((doc: any) => {
      const suitableImage = doc.multimedia.find(
        (media: any) => media.subtype === "xlarge" || media.crop_name === "articleLarge"
      );
  
      const imageUrl = suitableImage
        ? `https://www.nytimes.com/${suitableImage.url}`
        : ""; 
  
      return {
        title: doc.headline.main,
        description: doc.abstract || "No description available",
        url: doc.web_url,
        source: { name: doc.source || "The New York Times" },
        urlToImage: imageUrl,
        author: doc.byline?.original || "Unknown"
      };
    });
  

// Fetching articles from multiple sources
export const fetchArticles = async (
  query: string,
  category: string,
  source: string,
  fromDate: string,
  toDate: string,
  author: string
): Promise<Article[]> => {
  const requests: Promise<Article[]>[] = [];

  if (source === "All" || source === "news-api") {
    const newsApiUrl = buildNewsApiUrl(query, category, fromDate, toDate, author);
    requests.push(fetchFromApi(newsApiUrl, newsApiResponse));
  }

  if (source === "All" || source === "the-guardian") {
    const guardianUrl = buildGuardianApiUrl(query, category, fromDate, toDate, author);
    requests.push(fetchFromApi(guardianUrl, guardianResponse));
  }

  if (source === "All" || source === "nytimes") {
    const nytUrl = buildNytApiUrl(query, category, fromDate, toDate, author);
    requests.push(fetchFromApi(nytUrl, nytResponse));
  }

  const results = await Promise.all(requests);
  return results.flat();
};

