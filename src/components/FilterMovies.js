import React from "react";

export const FilterMovies = ({ search, setSearch }) => {
  return (
    <div className="filter-movies">
      <input value={search} onChange={setSearch}></input>
    </div>
  );
};
