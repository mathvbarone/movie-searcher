const baseURL = 'https://api.themoviedb.org/3/';
const KEY = 'd2a5dacf8351cfbbb0879ebda9e82777';

export const getMovies = term =>
	new Promise((resolve, reject) => {
		fetch(`${baseURL}search/movie?api_key=${KEY}&query=${term}`)
			.then(response => {
				resolve(response.json());
			})
			.catch(err => {
				reject(err);
			});
	});

export const getMovie = id =>
	new Promise((resolve, reject) => {
		fetch(`${baseURL}movie/${id}?api_key=${KEY}`)
			.then(response => {
				resolve(response.json());
			})
			.catch(err => {
				reject(err);
			});
	});

export const POSTER_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
