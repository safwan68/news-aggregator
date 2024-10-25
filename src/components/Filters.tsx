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

interface FiltersProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({ query, onSearch, onFilter, setQuery }) => {
  const [category, setCategory] = useState<string>("general");
  const [source, setSource] = useState<string>("All");
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
    setCategory("");
    setSource("All");
    setAuthor("");
    setFromDate("");
    setToDate("");
  
    const clearedFilters = {
      category: "",   
      source: "All",  
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
          Filter
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
              <Typography variant="h6">Apply Filters</Typography>
              <IconButton onClick={() => setFilterOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Author"
                  variant="outlined"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Source</InputLabel>
                  <Select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    label="Source"
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="nytimes">New York Times</MenuItem>
                    <MenuItem value="the-guardian">The Guardian</MenuItem>
                    <MenuItem value="news-api">News Org</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="From Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="To Date"
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
                Clear Filters
              </Button>
              <Button
                variant="contained"
                onClick={handleFilter}
                sx={{ backgroundColor: "#1976d2", borderRadius: "20px" }}
              >
                Apply Filters
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};
