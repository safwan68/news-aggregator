# News Aggregator App

This news aggregator app, built with React, fetches and displays articles from popular open-source news APIs, including New York Times, The Guardian, and News API. It allows users to easily search, filter, and browse news articles from multiple reliable sources, offering a personalized news feed experience.

## Features

- **Article Fetching:** Integrates multiple open-source APIs to retrieve and display the latest news articles.
- **Search Functionality:** Allows users to search for specific topics or keywords across all news sources.
- **Filtering Options:**
  - **Date Range:** Filter news by specific dates.
  - **Author:** Limit results to articles from specific authors.
  - **Category:** Narrow down articles by categories such as technology, sports, entertainment, etc.
  - **Source:** Select articles from specific sources (e.g., New York Times, The Guardian, or News API).
- **Personalized Feed:** Use the filtering options to customize your news feed based on interests.

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm
- Docker

### Installation

1. Clone the repository: 
   `git clone https://github.com/safwan68/news-aggregator.git`
   
2. Navigate into the project directory: 
   `cd news-aggregator`
   
3. Install dependencies: 
   `npm install`

   If you encounter dependency conflicts, you can run: 
   `npm install --legacy-peer-deps`

### Running the App

To start the app, run: 
`npm start`

### Docker

1. Build the Docker Image: 
   `docker build -t news-aggregator-app .`

2. Run the Docker Container: 
   `docker run -p 3000:3000 news-aggregator-app`

## Future Enhancements

- **User Authentication:** Allow users to save favorite articles and create an account for personalized recommendations.
- **Pagination:** Implement pagination for improved browsing.
- **Notifications:** Enable notifications for breaking news or category-specific alerts.
