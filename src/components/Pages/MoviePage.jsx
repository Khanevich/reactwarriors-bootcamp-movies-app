import React from "react";
import MovieDetail from "../Movies/Tabs/MovieDetail";
import MovieVideos from "../Movies/Tabs/MovieVideos";
import MovieCredits from "../Movies/Tabs/MovieCredits";
import MovieInfo from "../Movies/MovieInfo";
import MovieTabs from "../Movies/MovieTabs";
import CallApi from "../../api/api";
import classnames from "classnames";
import { Route, Switch } from "react-router-dom";

class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieInfo: []
    };
  }

  componentDidMount() {
    console.log("Component mount");
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        movieInfo: data
      });
    });
  }
  render() {
    const { movieInfo } = this.state;
    return (
      <div className="container-fluid">
        <MovieInfo movieInfo={movieInfo} />
        <MovieTabs movieInfo={movieInfo} />
        <Switch>
          <Route
            exact
            path="/movie/:id/detail"
            render={propsRouter => (
              <MovieDetail {...propsRouter} movieInfo={movieInfo} />
            )}
          />
          <Route path="/movie/:id/videos" component={MovieVideos} />
          <Route path="/movie/:id/credits" component={MovieCredits} />
        </Switch>
      </div>
    );
  }
}

export default MoviePage;
