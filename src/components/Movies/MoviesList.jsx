import React from "react";
import MovieItem from "./MovieItem";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class MoviesList extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }
  render() {
    const { movies } = this.props.moviesPageStore;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MoviesList;
