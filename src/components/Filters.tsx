import React, { useState } from "react";
import {
  TextField,
  Button,
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
import {
  CATEGORIES,
  CATEGORY_LABEL,
  CLEAR_FILTER,
  APPLY_FILTER,
  SOURCE,
  SOURCE_LABEL,
  FILTERS,
  FILTER,
  FROM_DATE,
  TO_DATE,
  AUTHOR,
  GENERAL,
  ALL,
} from "../constants/constants";
import SelectField from "./customComponents/SelectField";
import DateField from "./customComponents/DateField";
import CustomButton from "./customComponents/CustomBtn";
import { styles } from "./styles/filterStyles";

interface FiltersProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  query,
  onSearch,
  onFilter,
  setQuery,
}) => {
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
      category: GENERAL,
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
    <Box sx={styles.box}>
      <Box sx={styles.searchContainer}>
        {/* Search Field */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          sx={styles.textField}
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
          sx={styles.filterButton}
        >
          {FILTER}
        </Button>

        {/* Filter Icon for mobile screens */}
        <IconButton
          onClick={() => setFilterOpen(true)}
          sx={styles.mobileFilterButton}
        >
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* Filter Modal */}
      <Modal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        sx={styles.modal}
      >
        <Card sx={styles.card}>
          <CardContent>
            <Box sx={styles.modalHeader}>
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
                <SelectField
                  label={CATEGORY_LABEL}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as string)}
                  options={CATEGORIES}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectField
                  label={SOURCE_LABEL}
                  value={source}
                  onChange={(e) => setSource(e.target.value as string)}
                  options={SOURCE}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateField
                  label={FROM_DATE}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateField
                  label={TO_DATE}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={styles.buttonContainer}>
              <CustomButton
                variant="outlined"
                onClick={handleClearFilter}
                label={CLEAR_FILTER}
              />
              <CustomButton
                variant="contained"
                onClick={handleFilter}
                label={APPLY_FILTER}
                sx={{ backgroundColor: "#1976d2" }}
              />
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};
