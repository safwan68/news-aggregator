import React, { useState } from "react";
import { Container } from "@mui/material";
import { NewsFeed } from "./components/NewsFeed";
import { Filters } from "./components/Filters";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    category: "general",
    source: "All",
    fromDate: "",
    toDate: "",
    author: "",
  });

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleFilter = (updatedFilters: any) => {
    setFilters(updatedFilters);
  };

  return (
    <>
    <Header />
    <Container>
      <Filters query={query} onSearch={handleSearch} onFilter={handleFilter} setQuery={setQuery} />
      <NewsFeed query={query} filters={filters} />
    </Container>
    <Footer />
    </>
  );
};

export default App;
