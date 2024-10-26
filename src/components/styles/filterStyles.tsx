import { SxProps } from "@mui/material";

export const styles: Record<string, SxProps> = {
  box: {
    padding: "1rem",
    borderRadius: "20px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
    flexDirection: "row",
    gap: 1,
  },
  textField: {
    width: { xs: "70%", md: "50%" },
    borderRadius: "20px",
    height: "50px",
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
    },
  },
  filterButton: {
    display: { xs: "none", md: "flex" },
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: 1.5,
    marginLeft: 1,
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#155a8a",
    },
  },
  mobileFilterButton: {
    display: { xs: "block", md: "none" },
    width: "50px",
    height: "50px",
    backgroundColor: "#1976d2",
    color: "#fff",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#155a8a",
    },
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: { xs: "1rem", md: "2rem" },
  },
  card: {
    width: { xs: "100%", md: "50%" },
    borderRadius: "20px",
    maxHeight: { xs: "80vh", md: "auto" },
    overflowY: { xs: "scroll", md: "visible" },
    boxShadow: 3,
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: 3,
  },
};
