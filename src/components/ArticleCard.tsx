import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import DefaultImage from "../images/news_image_icon.webp";

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
  const renderText = (
    text: string | undefined,
    variant: "h6" | "body2",
    lines: number,
    additionalStyles = {}
  ) => (
    <Typography
      gutterBottom={variant === "h6"}
      variant={variant}
      color={variant === "body2" ? "textSecondary" : undefined}
      sx={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...additionalStyles,
      }}
    >
      {text}
    </Typography>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: 480,
          margin: 1,
          height: 470,
          position: "relative",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={article.urlToImage || DefaultImage}
          alt={article.title}
        />

        <CardContent
          sx={{
            height: "200px",
            // overflowY: "auto",
            paddingBottom: "60px", 
            paddingX: "10px", 
            borderRadius: "8px", 
          }}
        >
          {renderText(article.title, "h6", 2)}
          {renderText(article.description, "body2", 5)}
          {renderText(`Author: ${article.author}`, "body2", 2, {
            fontWeight: 600,
          })}
        </CardContent>

        <Button
          size="small"
          color="primary"
          href={article.url}
          target="_blank"
          sx={{
            position: "absolute",
            bottom: "10px",
            paddingX: "10px",
            zIndex: 1, 
            background: "rgba(255, 255, 255, 1)", 
          }}
        >
          {`Read more at ${article.source?.name || "Source"}`}
        </Button>
      </Card>
    </Box>
  );
};
