import { Typography } from "@mui/material";

export const ArticleRenderText = (
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
