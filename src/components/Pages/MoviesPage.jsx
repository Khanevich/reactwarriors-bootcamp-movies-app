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
  // constructor() {
  //   super();
  //   this.state = {
  //     filters: {
  //       sort_by: "popularity.desc",
  //       primary_release_year: "2018",
  //       with_genres: []
  //     },
  //     page: 1,
  //     total_pages: ""
  //   };
  // }

  // onChangeFilters = event => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   this.setState(prevState => ({
  //     filters: {
  //       ...prevState.filters,
  //       [name]: value
  //     }
  //   }));
  // };

  // onChangePage = page => {
  //   console.log(page);
  //   this.setState({
  //     page
  //   });
  // };

  // onClear = event => {
  //   this.setState({
  //     filters: {
  //       sort_by: "popularity.desc",
  //       primary_release_year: "2018",
  //       with_genres: []
  //     },
  //     page: 1
  //   });
  // };

  // getTotalPages = total_pages => {
  //   this.setState({
  //     total_pages
  //   });
  // };

  render() {
    const {
      filters,
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
      onClear,
      getTotalPages
    } = this.props.moviesPageStore;

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
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onChangeFilters={onChangeFilters}
                  onChangePage={onChangePage}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={onChangePage}
              getTotalPages={getTotalPages}
              onChangeFilters={onChangeFilters}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage;
