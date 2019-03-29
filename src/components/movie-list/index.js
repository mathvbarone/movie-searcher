import React from 'react';
import Grid from '@material-ui/core/Grid';
import MovieItem from '../movie-item';

const MoviesList = ({ movies }) => {
	return (
		<Grid container spacing={24}>
			{movies.map(movie => (
				<Grid item xs={12} md={6} key={movie.id}>
					<MovieItem movie={movie} />
				</Grid>
			))}
		</Grid>
	);
};

export default MoviesList;
