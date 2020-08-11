const baseURL = "https://api.themoviedb.org/3/";
const KEY = "d2a5dacf8351cfbbb0879ebda9e82777";

export const getMovies = async (term) => {
  try {
    const response = await fetch(
      `${baseURL}search/movie?api_key=${KEY}&query=${term}`
    );
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const getMovie = async (id) => {
  try {
    const response = await fetch(`${baseURL}movie/${id}?api_key=${KEY}`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const POSTER_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
