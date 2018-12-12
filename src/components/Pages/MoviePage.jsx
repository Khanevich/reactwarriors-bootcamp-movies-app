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
      movieInfo: {},
      isLoading: false
    };
  }

  componentDidMount() {
    console.log("Component mount");
    this.setState({
      isLoading: true
    });
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        movieInfo: data,
        isLoading: false
      });
    });
  }
  render() {
    const { movieInfo, isLoading } = this.state;
    return (
      <div className="container-fluid">
        {isLoading ? (
          <p>loading</p>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MoviePage;
