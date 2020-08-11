import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import dayjs from "dayjs";
import "./movie-detail.css";
import { getMovie, BACKDROP_URL, POSTER_URL } from "../../shared/movie-db-api";

const MovieDetail = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie(id)
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const voteAverageBgColor = (average) => {
    if (average < 5) {
      return "#a90000";
    }
    if (average >= 5 && average < 7.5) {
      return "#d8ab13";
    }
    return "green";
  };

  const backgroundImage = (path) =>
    path && `url(${BACKDROP_URL}/${backdrop_path})`;

  const {
    backdrop_path,
    original_title,
    poster_path,
    overview,
    tagline,
    genres,
    release_date,
    vote_average,
  } = movie;

  return (
    <section className="movie-detail height-wrapper">
      <header
        className="movie-detail-hero"
        style={{
          backgroundImage: backgroundImage(backdrop_path),
        }}
      />
      <section className="container">
        <section className="movie-detail-highlight">
          {poster_path && (
            <figure className="movie-detail-poster">
              <img
                src={`${POSTER_URL}${poster_path}`}
                alt={`Poster of the movie ${original_title}`}
              />{" "}
              <figcaption className="is-hidden">
                Poster of the movie {original_title}
              </figcaption>
            </figure>
          )}
          <section>
            <h1 className="movie-detail-title">
              {original_title}
              {vote_average > 0 && (
                <span
                  className="movie-detail-scorenumber"
                  style={{ backgroundColor: voteAverageBgColor(vote_average) }}
                >
                  {vote_average}
                </span>
              )}
            </h1>
            <h2 className="movie-detail-tagline">{tagline}</h2>
            <ul className="movie-detail-genres">
              <li>
                <strong>Genres:</strong>
              </li>
              {genres
                ? genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
                : null}
            </ul>
            <span className="movie-detail-release">
              <strong>Release Date: </strong>
              {dayjs(release_date).format("MMMM D, YYYY")}
            </span>
          </section>
        </section>
        <section className="movie-detail-content">
          <h3 className="movie-detail-subtitle">Overview</h3>
          <p className="movie-detail-overview">{overview}</p>
          <Link className="btn btn-green btn-medium" title="Back" to="">
            Back
          </Link>
        </section>
      </section>
    </section>
  );
};

export default MovieDetail;
