import { MovieStars } from "./MovieStars";
import React from "react";

const MovieItem = ({
  title,
  posterUrl,
  genres,
  voteAverage,
  overview,
  yearProduction,
}) => {
  const getProductionYear = () => {
    return yearProduction ? yearProduction.split("-")[0] : "";
  };

  return (
    <div className="movie-item">
      <div className="movie-poster">
        <div
          className="movie-poster-bg"
          style={{
            backgroundImage: `url(https://themoviedb.org/t/p/w300_and_h450_bestv2${posterUrl})`,
          }}
        ></div>
        <i className="bx bx-play-circle"></i>
      </div>
      <div className="movie-item-main">
        <div className="movie-info">
          <h2 className="movie-title">{title}</h2>
          <p className="year-production">{getProductionYear()}</p>
          {voteAverage > 0 ? (
            <MovieStars voteAverage={voteAverage}></MovieStars>
          ) : (
            <p className="no-ratings">No ratings</p>
          )}

          <p className="movie-overview">{overview}</p>
        </div>
      </div>
      <div className="movie-item-bottom">
        {genres.map((genre) => (
          <div className="movie-genre">{genre.name}</div>
        ))}
      </div>
    </div>
  );
};

export default MovieItem;
