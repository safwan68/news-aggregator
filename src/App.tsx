import React, { useState } from "react";
import { Container } from "@mui/material";
import { NewsFeed } from "./components/NewsFeed";
import { Filters } from "./components/Filters";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    category: "general",
    source: "All",
    fromDate: "",
    toDate: "",
    author: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setQuery(""); 
  };

  const handleFilter = (updatedFilters: any) => {
    setSearchQuery("");
    setFilters(updatedFilters);
  };

  return (
    <>
    <Header />
    <Container>
      <Filters query={query} onSearch={handleSearch} onFilter={handleFilter} setQuery={setQuery} />
      <NewsFeed query={searchQuery} filters={filters} />
    </Container>
    <Footer />
    </>
  );
};

export default App;
