import React from "react";

export const GenreButton = ({ genre, genreId, setCurrentGenre }) => {
  return (
    <button
      className="genre-btn"
      onClick={() => {
        setCurrentGenre(genreId);
      }}
    >
      {genre}
    </button>
  );
};
