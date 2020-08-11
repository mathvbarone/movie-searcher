import React, { useState, useEffect } from "react";
import "./search.css";
import Icon from "@material-ui/core/Icon";
import OscarIcon from "../../assets/images/oscar-icon.svg";

const Search = ({ onInputChange }) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const term = sessionStorage.getItem("term");
    if (term) {
      setTerm(term);
    }
  }, []);

  const onChange = (event) => {
    const term = event.target.value;
    setTerm(term);
    return onInputChange(term);
  };

  const randomArrayItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const searchRandomMovie = () => {
    const randomOscarMovie = randomArrayItem(oscarMovies);
    const term = randomOscarMovie;
    setTerm(term);

    return onInputChange(term);
  };

  const clearTerm = () => {
    setTerm("");
    sessionStorage.setItem("term", "");
    return onInputChange("");
  };

  const oscarMovies = [
    "Green Book",
    "Roma",
    "BlacKkKlansman",
    "Free Solo",
    "Spider-Man: Into the Spider-Verse",
    "Period. End of Sentence.",
    "Bohemian Rhapsody",
    "Bao",
    "Skin",
    "First Man",
    "Vice",
  ];
  return (
    <section className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="search-bar-group">
          <input
            type="text"
            value={term}
            onChange={onChange}
            className={`search-bar-input
					  ${term ? "is-active" : ""}`}
          />
          <span className="search-bar-highlight" />
          <span className="search-bar-border" />
          <label className="search-bar-label">
            Search for your favorite movie...
          </label>
          <Icon
            onClick={clearTerm}
            className="fa fa-times"
            style={{ fontSize: 20 }}
          />
        </div>
      </form>
      <span className="search-or-random">Or</span>
      <a
        title="Try a random Oscar 2019 winner"
        onClick={searchRandomMovie}
        className="btn oscar-button"
        type="button"
      >
        Try a random Oscar 2019 winner
        <i className="oscar-icon">
          <OscarIcon />
        </i>
      </a>
    </section>
  );
};

export default Search;
