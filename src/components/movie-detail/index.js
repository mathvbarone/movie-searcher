import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './movie-detail.css';
import { getMovie, BACKDROP_URL, POSTER_URL } from '../../shared/movie-db-api';

class MovieDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { movie: {} };
	}

	getMovieDetail(id) {
		getMovie(id)
			.then(data => {
				this.setState({ movie: data });
			})
			.catch(err => console.log(err));
	}

	voteAverageBgColor(average) {
		if (average < 5) {
			return '#a90000';
		}
		if (average >= 5 && average < 7.5) {
			return '#d8ab13';
		}
		return 'green';
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.getMovieDetail(id);
	}

	render() {
		const {
			backdrop_path,
			original_title,
			poster_path,
			overview,
			tagline,
			genres,
			release_date,
			vote_average,
		} = this.state.movie;

		const averageBgColor = this.voteAverageBgColor(vote_average);

		return (
			<section className="movie-detail height-wrapper">
				<header
					className={'movie-detail-hero'}
					style={{
						backgroundImage: `url(${BACKDROP_URL}${backdrop_path})`,
					}}
				/>
				<section className={'container'}>
					<section className={'movie-detail-highlight'}>
						{poster_path && (
							<figure className={'movie-detail-poster'}>
								<img
									src={`${POSTER_URL}${poster_path}`}
									alt={`Poster of the movie ${original_title}`}
								/>{' '}
								<figcaption className="is-hidden">Poster of the movie {original_title}</figcaption>
							</figure>
						)}
						<section>
							<h1 className={'movie-detail-title'}>
								{original_title}
								{vote_average > 0 && (
									<span className={'movie-detail-scorenumber'} style={{ backgroundColor: averageBgColor }}>
										{vote_average}
									</span>
								)}
							</h1>
							<h2 className={'movie-detail-tagline'}>{tagline}</h2>
							<ul className={'movie-detail-genres'}>
								<li>
									<strong>Genres:</strong>
								</li>
								{genres ? genres.map(genre => <li key={genre.id}>{genre.name}</li>) : null}
							</ul>
							<span className={'movie-detail-release'}>
								<strong>Release Date: </strong>
								{dayjs(release_date).format('MMMM D, YYYY')}
							</span>
						</section>
					</section>
					<section className={'movie-detail-content'}>
						<h3 className={'movie-detail-subtitle'}>Overview</h3>
						<p className={'movie-detail-overview'}>{overview}</p>
						<Link className={'btn btn-green btn-medium'} title="Back" to={'/movies'}>
							Back
						</Link>
					</section>
				</section>
			</section>
		);
	}
}

export default MovieDetail;
