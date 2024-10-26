import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import DefaultImage from "../images/news_image_icon.webp";
import { styles } from "./styles/ArticleCardStyles";
import { ArticleRenderText } from "./customComponents/ArticleRenderText";

interface ArticleCardProps {
  article: {
    title: string;
    description: string;
    author: string;
    urlToImage: string;
    url: string;
    source: {
      name: string;
    };
  };
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardMedia
          component="img"
          image={article.urlToImage || DefaultImage}
          alt={article.title}
          sx={styles.cardMedia}
        />

        <CardContent sx={styles.cardContent}>
          {ArticleRenderText(article.title, "h6", 2)}
          {ArticleRenderText(article.description, "body2", 5)}
          {ArticleRenderText(`Author: ${article.author}`, "body2", 2, {
            fontWeight: 600,
          })}
        </CardContent>

        <Button
          size="small"
          color="primary"
          href={article.url}
          target="_blank"
          sx={styles.button}
        >
          {`Read more at ${article.source?.name || "Source"}`}
        </Button>
      </Card>
    </Box>
  );
};
