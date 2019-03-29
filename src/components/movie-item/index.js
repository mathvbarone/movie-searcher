import React from 'react';
import { POSTER_URL } from '../../shared/movie-db-api';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './movie-item.css';

const MovieItem = ({ movie }) => {
	const { poster_path, original_title, release_date, overview, id } = movie;

	const trimmedOverview = overview.substring(0, 200) + '...';

	return (
		<Link className={'movie-item-link'} title={movie.original_title} to={`movie-detail/${movie.id}`}>
			<section className="movie-item">
				{poster_path && (
					<figure className="movie-item-poster">
						<img src={`${POSTER_URL}${poster_path}`} alt={`Poster of the movie ${original_title}`} />{' '}
						<figcaption className="is-hidden">Poster of the movie {original_title}</figcaption>
					</figure>
				)}
				<section className="movie-item-content">
					<h3 className="movie-item-title">{original_title}</h3>
					<h5 className="movie-item-date">{dayjs(release_date).format('MMMM D, YYYY')}</h5>
					<p className="movie-item-overview">{trimmedOverview}</p>
					<span className="btn btn-green btn-small">More</span>
				</section>
			</section>
		</Link>
	);
};

export default MovieItem;
