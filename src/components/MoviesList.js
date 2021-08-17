import React, { useEffect, useState } from "react";

import { FilterMovies } from "./FilterMovies";
import { GenreButton } from "./GenreButton";
import MovieItem from "./MovieItem";
import { MoviesListPagination } from "./MoviesListPagination";
import { SortMovieBy } from "./SortMovieBy";
import axios from "axios";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(0);
  const [currentGenre, setCurrentGenre] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const getMethod = () => {
    if (sortBy !== "" && search === "") {
      return "discover";
    }
    if (currentGenre !== 1) {
      return "discover";
    }
    return "search";
  };

  const getAllMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${getMethod()}/movie?api_key=c74028613530dedccb1b6461020788d1${
          currentGenre === 1 ? "&query=a" : ""
        }${search !== "" ? `&query=${search}` : ""}${
          sortBy !== "" ? `&sort_by=${sortBy}` : ""
        }${
          currentGenre !== 1 ? `&with_genres=${currentGenre}` : ""
        }&page=${currentPage}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setPagesAmount(res.data.total_pages);
      });
  };

  const getAllGenres = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=c74028613530dedccb1b6461020788d1"
      )
      .then((res) => {
        setGenres(res.data.genres);
      });
  };

  const getGenresByMovie = (movie) => {
    if (genres.length > 0) {
      return genres.filter((genre) => movie.genre_ids.includes(genre.id));
    }
    return;
  };

  const renderMovies = () => {
    return movies.map((movie) => (
      <MovieItem
        key={movie.id}
        title={movie.original_title}
        posterUrl={movie.poster_path}
        overview={movie.overview}
        genres={getGenresByMovie(movie)}
        yearProduction={movie.release_date}
        voteAverage={movie.vote_average}
      />
    ));
  };

  const renderGenresButtons = () => {
    return (
      <>
        <button className="genre-btn" onClick={() => setCurrentGenre(1)}>
          All
        </button>
        {genres.map((genre) => (
          <GenreButton
            key={genre.id}
            genreId={genre.id}
            genre={genre.name}
            setCurrentGenre={setCurrentGenre}
            currentGenre={currentGenre}
          />
        ))}
      </>
    );
  };

  useEffect(() => {
    getAllGenres();
  }, [currentPage]);

  useEffect(() => {
    getAllMovies();
  }, [genres, currentGenre, search, sortBy]);

  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="genres-btns">{renderGenresButtons()}</div>
        <i className="bx bx-power-off"></i>
      </div>
      <div className="searching-movie-box">
        <FilterMovies
          search={search}
          setSearch={(e) => {
            setSearch(e.target.value);
          }}
        />
        <SortMovieBy
          setSortBy={(e) => {
            setSortBy(e.target.value);
          }}
          sortBy={sortBy}
        ></SortMovieBy>
      </div>

      <div className="movies-list">{renderMovies()}</div>
      <MoviesListPagination
        setCurrentPage={setCurrentPage}
        pagesAmount={pagesAmount}
        currentPage={currentPage}
        pagesOffSet={2}
      ></MoviesListPagination>
    </div>
  );
};
