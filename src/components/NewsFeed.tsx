import React, { useEffect, useState, useCallback } from "react";
import { fetchArticles } from "../services/api";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { ArticleCard } from "./ArticleCard";

interface NewsFeedProps {
  query: string;
  filters: {
    category: string;
    source: string;
    fromDate: string;
    toDate: string;
    author: string;
  };
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ query, filters }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { category, source, fromDate, toDate, author } = filters;

      const data = await fetchArticles(
        query,
        category,
        source,
        fromDate,
        toDate,
        author
      );

      setArticles(data.length ? data : []);
    } catch (err) {
      setError("Failed to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [query, filters]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div>

      <Grid container spacing={2}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ArticleCard article={article} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ width: "100%" }}>
            No articles found.
          </Typography>
        )}
      </Grid>
    </div>
  );
};
