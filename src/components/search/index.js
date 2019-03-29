import React from 'react';
import './search.css';
import Icon from '@material-ui/core/Icon';
import OscarIcon from '../../assets/images/oscar-icon.svg';

const oscarMovies = [
	'Green Book',
	'Roma',
	'BlacKkKlansman',
	'Free Solo',
	'Spider-Man: Into the Spider-Verse',
	'Period. End of Sentence.',
	'Bohemian Rhapsody',
	'Bao',
	'Skin',
	'First Man',
	'Vice',
];
class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = { term: '' };

		this.searchRandomMovie = this.searchRandomMovie.bind(this);
		this.clearTerm = this.clearTerm.bind(this);
		this.onInputChange = this.onInputChange.bind(this);

		if (sessionStorage.getItem('term')) {
			const term = sessionStorage.getItem('term');
			this.state.term = term;
		}
	}

	onInputChange(event) {
		const term = event.target.value;
		this.setState({ term });
		return this.props.onInputChange(term);
	}

	randomArrayItem(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	searchRandomMovie() {
		const randomOscarMovie = this.randomArrayItem(oscarMovies);
		const term = randomOscarMovie;
		this.setState({ term });
		return this.props.onInputChange(term);
	}

	clearTerm() {
		const term = '';
		this.setState({ term });
		sessionStorage.setItem('term', '');
		return this.props.onInputChange(term);
	}

	render() {
		return (
			<section className="search">
				<form onSubmit={e => e.preventDefault()}>
					<div className="search-bar-group">
						<input
							type="text"
							value={this.state.term}
							onChange={this.onInputChange}
							ref={'searchBar'}
							className={`search-bar-input
              				${this.state.term ? 'is-active' : ''}`}
						/>
						<span className="search-bar-highlight" />
						<span className="search-bar-border" />
						<label className="search-bar-label">Search for your favorite movie...</label>
						<Icon onClick={this.clearTerm} className="fa fa-times" style={{ fontSize: 20 }} />
					</div>
				</form>
				<span className="search-or-random">Or</span>
				<a
					title="Try a random Oscar 2019 winner"
					onClick={this.searchRandomMovie}
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
	}
}

export default Search;
