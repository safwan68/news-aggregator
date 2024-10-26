import { SxProps } from "@mui/material";

export const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  } as SxProps,
  card: {
    width: 480,
    margin: 1,
    height: 470,
    position: "relative",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    },
  } as SxProps,
  cardMedia: {
    height: 200,
  } as SxProps,
  cardContent: {
    height: "200px",
    paddingBottom: "60px",
    paddingX: "10px",
    borderRadius: "8px",
  } as SxProps,
  button: {
    position: "absolute",
    bottom: "10px",
    paddingX: "10px",
    zIndex: 1,
    background: "rgba(255, 255, 255, 1)",
  } as SxProps,
};
