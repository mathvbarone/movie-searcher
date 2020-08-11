import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { getMovies } from "../../shared/movie-db-api";
import Logo from "../../assets/images/the-movie-db-logo.svg";
import Loader from "../../assets/images/popcorn-icon.svg";
import MoviesList from "../movie-list";
import Search from "../search";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHasBeenDone, setSearchHasBeenDone] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const term = sessionStorage.getItem("term");

    if (term) {
      fetchData(term);
    }
  }, []);

  const fetchData = async (term) => {
    try {
      const data = await getMovies(term);
      if (data.status_code === 7) {
        sessionStorage.setItem("term", "");
        setLoading(false);
        setError(true);
        setMovies([]);
      } else {
        setLoading(false);
        setMovies(data.results);
      }
    } catch (err) {
      sessionStorage.setItem("term", "");
      setLoading(false);
      setError(true);
      setMovies([]);
    }
  };

  const onTermSubmit = (term) => {
    setLoading(true);
    setError(false);
    setSearchHasBeenDone(true);

    if (term) {
      sessionStorage.setItem("term", term);
      fetchData(term);
    } else {
      setMovies([]);
      setLoading(false);
      setSearchHasBeenDone(false);
      sessionStorage.setItem("term", "");
    }
  };

  const movieSearch = debounce((term) => onTermSubmit(term), 1000);

  return (
    <section>
      <section className="container height-wrapper">
        <header className="main-header">
          <a
            href="https://www.themoviedb.org/"
            title="The Movie DB Logo"
            target="_blank"
            rel="noopener"
          >
            <figure>
              <Logo className="movie-db-logo" />
              <figcaption className="is-hidden">The Movie DB Logo</figcaption>
            </figure>
          </a>
          <h1 className="main-title">Movie Searcher</h1>
        </header>

        <Search onInputChange={movieSearch} />

        {loading && <Loader className="request-loader" />}

        {!loading && (
          <section>
            {error && (
              <h3 className="text-center">
                Looks like something went wrong. 😞.
              </h3>
            )}
            {searchHasBeenDone && !error && !movies.length && (
              <h3 className="text-center">
                Looks like this movie has not been made yet 😞.
              </h3>
            )}
            <MoviesList movies={movies} />
          </section>
        )}
      </section>
    </section>
  );
};

export default Home;
