import React, { useEffect, useState } from "react";
import { logInUser, logOutUser } from "states/userSlice";

import { FilterMovies } from "./FilterMovies";
import { GenreButton } from "./GenreButton";
import MovieItem from "./MovieItem";
import { MoviesListPagination } from "./MoviesListPagination";
import { SortMovieBy } from "./SortMovieBy";
import axios from "axios";
import { useDispatch } from "react-redux";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(0);
  const [currentGenre, setCurrentGenre] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [keywordsResult, setKeywordsResult] = useState([]);

  const logOut = () => {
    dispatch(logOutUser());
  };

  const getMethod = () => {
    if (sortBy !== "" || keywords.length > 0) {
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
        }${sortBy !== "" ? `&sort_by=${sortBy}` : ""}${
          currentGenre !== 1 ? `&with_genres=${currentGenre}` : ""
        }${
          keywords.length > 0
            ? `&with_keywords=${keywords
                .map((keyword) => keyword.id)
                .join("|")}`
            : ""
        }&page=${currentPage}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setPagesAmount(res.data.total_pages);
      });
  };

  const getKeywords = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/keyword?api_key=c74028613530dedccb1b6461020788d1&query=${keyword}&page=${currentPage}`
      )
      .then((res) => {
        setKeywordsResult(res.data.results);
        console.log(res.data.results);
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
    return movies.length > 0
      ? movies.map((movie) => (
          <MovieItem
            key={movie.id}
            title={movie.original_title}
            posterUrl={movie.poster_path}
            overview={movie.overview}
            genres={getGenresByMovie(movie)}
            yearProduction={movie.release_date}
            voteAverage={movie.vote_average}
          />
        ))
      : null;
  };

  const renderKeywordsResults = () => {
    return keywordsResult.length > 0 && keyword !== ""
      ? keywordsResult.map((keywordResult, index) => (
          <div
            className="filter-movie-input-result"
            key={index}
            onClick={() => {
              if (keywords.includes(keywordResult)) return;
              else setKeywords([...keywords, keywordResult]);
            }}
          >
            <p>{keywordResult.name}</p>
          </div>
        ))
      : null;
  };

  const deleteKeyword = (keywordName) => {
    let newKeywords = keywords;
    newKeywords = newKeywords.filter((keyword) => keyword.name !== keywordName);
    setKeywords(newKeywords);
  };

  const renderChosenKeywords = () => {
    return keywords.length > 0
      ? keywords.map((keyword) => (
          <div className="chosen-keyword" key={keyword.id}>
            <p>{keyword.name}</p>

            <i
              className="bx bx-x"
              onClick={() => {
                deleteKeyword(keyword.name);
              }}
            ></i>
          </div>
        ))
      : null;
  };
  const renderGenresButtons = () => {
    return genres.length > 0 ? (
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
    ) : null;
  };

  useEffect(() => {
    getAllGenres();
  }, [currentPage]);

  useEffect(() => {
    getAllMovies();
  }, [genres, currentGenre, sortBy, keywords]);
  useEffect(() => {
    getKeywords();
  }, [keyword]);

  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="genres-btns">{renderGenresButtons()}</div>
        <i className="bx bx-power-off" onClick={logOut}></i>
      </div>
      <div className="searching-movie-box">
        <FilterMovies
          movieKeywords={keyword}
          setMovieKeywords={(e) => {
            setKeyword(e.target.value);
          }}
          keywordsResult={renderKeywordsResults()}
          chosenKeywords={renderChosenKeywords()}
          deleteAllKeywords={() => setKeywords([])}
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
