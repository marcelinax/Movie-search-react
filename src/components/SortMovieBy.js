import React from "react";

export const SortMovieBy = ({ sortBy, setSortBy }) => {
  return (
    <div className="sort-by">
      <select value={sortBy} onChange={setSortBy}>
        <option value={"original_title.desc"}>A-Z</option>
        <option value={"original_title.asc"}>Z-A</option>
        <option value={"vote_average.desc"}>Vote average desc</option>
        <option value={"vote_average.asc"}>Vote average asc</option>
      </select>
    </div>
  );
};
