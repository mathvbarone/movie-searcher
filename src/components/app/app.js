import React, { Fragment } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Movies from '../movies';
import MovieDetail from '../movie-detail';
import Footer from '../footer';

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							<Redirect to="/movies" />
						</Route>
						<Route exact path="/movies" component={Movies} />
						<Route exact path="/movie-detail/:id" component={MovieDetail} />
					</Switch>
				</BrowserRouter>
				<Footer />
			</Fragment>
		);
	}
}

export default App;
