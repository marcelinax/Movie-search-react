import React from "react";

export const GenreButton = ({
  genre,
  genreId,
  setCurrentGenre,
  currentGenre,
}) => {
  return (
    <button
      className={genreId === currentGenre ? "genre-btn--active" : "genre-btn"}
      onClick={() => {
        setCurrentGenre(genreId);
      }}
    >
      {genre}
    </button>
  );
};
