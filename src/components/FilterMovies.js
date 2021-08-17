import React from "react";

export const FilterMovies = ({ search, setSearch }) => {
  return (
    <div className="filter-movies">
      <i className="bx bx-search-alt-2"></i>
      <input value={search} onChange={setSearch}></input>
    </div>
  );
};
