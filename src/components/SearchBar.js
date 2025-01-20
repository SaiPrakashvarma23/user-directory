import React from "react";
import './SearchBar.css';

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ margin: "10px", padding: "10px", width: "80%" }}
    />
  );
};

export default SearchBar;
