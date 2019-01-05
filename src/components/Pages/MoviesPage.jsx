import React from "react";
import Filters from "../Filters/Filters";
import MoviesList from "../Movies/MoviesList";
import { inject, observer } from "mobx-react";

export const AppContext = React.createContext();

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class MoviesPage extends React.Component {
  render() {
    const { onClear } = this.props.moviesPageStore;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <button className="btn btn-light" onClick={onClear}>
                  Отчистить
                </button>
                <Filters />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage;
