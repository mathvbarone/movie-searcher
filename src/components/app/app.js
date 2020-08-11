import React, { Fragment } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../home";
import MovieDetail from "../movie-detail";
import Footer from "../footer";

const App = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/movie-detail/:id" component={MovieDetail} />
      </Switch>
    </BrowserRouter>
    <Footer />
  </Fragment>
);

export default App;
