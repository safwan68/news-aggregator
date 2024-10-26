import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Modal,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { CATEGORIES, CATEGORY_LABEL, CLEAR_FILTER, APPLY_FILTER, SOURCE, SOURCE_LABEL, FILTERS, FILTER, FROM_DATE, TO_DATE, AUTHOR, GENERAL, ALL } from "../constants/constants";

interface FiltersProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({ query, onSearch, onFilter, setQuery }) => {
  const [category, setCategory] = useState<string>(GENERAL);
  const [source, setSource] = useState<string>(ALL);
  const [author, setAuthor] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query) {
      onSearch(query);
      setQuery("");
    }
  };

  const handleClearFilter = () => {
    setCategory(GENERAL);
    setSource(ALL);
    setAuthor("");
    setFromDate("");
    setToDate("");
  
    const clearedFilters = {
      category: "",   
      source: ALL,  
      author: "",     
      fromDate: "",  
      toDate: "",     
    };
    
    onFilter(clearedFilters);
    setFilterOpen(false);
  };

  const handleFilter = () => {
    const updatedFilters = {
      category,
      source,
      author,
      fromDate,
      toDate,
    };
    onFilter(updatedFilters);
    setFilterOpen(false);
  }; 

  return (
    <Box
      sx={{ padding: "1rem", borderRadius: "20px" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          flexDirection: "row",
          gap: 1,
        }}
      >
        {/* Search Field */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          sx={{
            width: { xs: "70%", md: "50%" },
            borderRadius: "20px",
            height: "50px",
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => onSearch(query)}>
                  <SearchIcon sx={{ color: "#1976d2" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Filter Icon with Text for large screens */}
        <Button
          onClick={() => setFilterOpen(true)}
          startIcon={<FilterAltIcon />}
          sx={{
            display: { xs: "none", md: "flex" }, 
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: 1.5,
            marginLeft: 1,
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#155a8a",
            },
          }}
        >
          {FILTER}
        </Button>

        {/* Filter Icon for mobile screens */}
        <IconButton
          onClick={() => setFilterOpen(true)}
          sx={{
            display: { xs: "block", md: "none" }, 
            width: "50px",
            height: "50px",
            backgroundColor: "#1976d2",
            color: "#fff",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#155a8a",
            },
          }}
        >
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* Filter Modal */}
      <Modal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "1rem", md: "2rem" },
        }}
      >
        <Card
          sx={{
            width: { xs: "100%", md: "50%" },
            borderRadius: "20px",
            maxHeight: { xs: "80vh", md: "auto" },
            overflowY: { xs: "scroll", md: "visible" },
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{FILTERS}</Typography>
              <IconButton onClick={() => setFilterOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label={AUTHOR}
                  variant="outlined"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>{CATEGORY_LABEL}</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label={CATEGORY_LABEL}
                  >
                    {CATEGORIES.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>{SOURCE_LABEL}</InputLabel>
                  <Select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    label={SOURCE_LABEL}
                  >
                    {SOURCE.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={FROM_DATE}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={TO_DATE}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClearFilter}
                sx={{ borderRadius: "20px" }}
              >
                {CLEAR_FILTER}
              </Button>
              <Button
                variant="contained"
                onClick={handleFilter}
                sx={{ backgroundColor: "#1976d2", borderRadius: "20px" }}
              >
                {APPLY_FILTER}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};
