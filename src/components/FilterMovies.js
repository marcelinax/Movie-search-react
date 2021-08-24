import React from "react";

export const FilterMovies = ({
  movieKeywords,
  setMovieKeywords,
  keywordsResult,
  chosenKeywords,
  deleteAllKeywords,
}) => {
  return (
    <div className="filter-movie-input">
      <div className="input-box">
        {chosenKeywords}
        <input value={movieKeywords} onChange={setMovieKeywords}></input>
      </div>

      <i onClick={deleteAllKeywords} className="bx bx-x delete-all-btn"></i>

      <div
        className={
          movieKeywords !== ""
            ? "filter-movie-input-results--shown"
            : "filter-movie-input-results"
        }
      >
        {keywordsResult}
      </div>
    </div>
  );
};
