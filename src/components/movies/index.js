import React from 'react';
import debounce from 'lodash.debounce';
import { getMovies } from '../../shared/movie-db-api';
import Logo from '../../assets/images/the-movie-db-logo.svg';
import Loader from '../../assets/images/popcorn-icon.svg';
import MoviesList from '../movie-list';
import Search from '../search';

class Movies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			isLoading: false,
			searchHasBeenDone: false,
			error: false,
		};
	}

	componentDidMount() {
		const term = sessionStorage.getItem('term');
		if (term) {
			this.fetchData(term);
		}
	}

	fetchData(term) {
		getMovies(term)
			.then(data => {
				if (data.status_code === 7) {
					sessionStorage.setItem('term', '');
					return this.setState({ isLoading: false, error: true, movies: [] });
				} else {
					return this.setState({ movies: data.results, isLoading: false });
				}
			})
			.catch(err => {
				sessionStorage.setItem('term', '');
				this.setState({ isLoading: false, error: true, movies: [] })
			});
	}

	onTermSubmit(term) {
		this.setState({ isLoading: true, searchHasBeenDone: true, error: false });
		if (term) {
			sessionStorage.setItem('term', term);
			this.fetchData(term);
		} else {
			return this.setState({
				movies: [],
				searchHasBeenDone: false,
				isLoading: false,
			});
		}
	}

	render() {
		const movieSearch = debounce(term => this.onTermSubmit(term), 1000);
		const { isLoading, error, movies, searchHasBeenDone } = this.state;

		return (
			<section>
				<section className="container height-wrapper">
					<header className="main-header">
						<a href="https://www.themoviedb.org/" title="The Movie DB Logo" target="_blank" rel="noopener">
							<figure>
								<Logo className="movie-db-logo" />
								<figcaption className="is-hidden">The Movie DB Logo</figcaption>
							</figure>
						</a>
						<h1 className="main-title">Movie Searcher</h1>
					</header>

					<Search onInputChange={movieSearch} />

					{isLoading && <Loader className="request-loader" />}

					{!isLoading && (
						<section>
							{error && <h3 className="text-center">Looks like something went wrong. 😞.</h3>}
							{searchHasBeenDone && !error && !movies.length && (
								<h3 className="text-center">Looks like this movie has not been made yet 😞.</h3>
							)}
							<MoviesList movies={movies} />
						</section>
					)}
				</section>
			</section>
		);
	}
}

export default Movies;
