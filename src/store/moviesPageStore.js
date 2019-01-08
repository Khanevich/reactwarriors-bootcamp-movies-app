import { observable, action, reaction, values } from "mobx";
import CallApi from "../api/api";

const initialFilter = {
  sort_by: "popularity.desc",
  primary_release_year: "2018",
  with_genres: []
};
class MoviesPageStore {
  constructor() {
    reaction(
      () => values(this.filters),
      () => {
        this.onChangePage(1);
        this.getMovies();
      }
    );
    reaction(() => this.page, () => this.getMovies());
  }
  @observable
  filters = initialFilter;
  @observable
  page = 1;
  @observable
  total_pages = "";

  @observable
  movies = [];

  @action
  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    // this.setState(prevState => ({
    //   filters: {
    //     ...prevState.filters,
    //     [name]: value
    //   }
    // }));
    this.filters = this.filters;
    this.filters[name] = value;
  };

  @action
  onChangePage = page => {
    console.log(page);
    // this.setState({
    //   page
    // });
    this.page = page;
  };

  @action
  onClear = event => {
    for (let key in initialFilter) {
      this.filters[key] = initialFilter[key];
    }
  };

  @action
  getTotalPages = total_pages => {
    // this.setState({
    //   total_pages
    // });
    this.total_pages = total_pages;
  };

  @action
  getMovies = (filters = this.filters, page = this.page) => {
    const { sort_by, primary_release_year, with_genres } = this.filters;
    const queryStringParams = {
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };

    if (with_genres.length > 0) {
      queryStringParams.with_genres = with_genres.join(",");
    }

    CallApi.get("/discover/movie", {
      params: queryStringParams
    }).then(data => {
      // this.setState({
      //   movies: data.results
      // });
      this.movies = data.results;
      this.getTotalPages(data.total_pages);
    });
  };
}

export const moviesPageStore = new MoviesPageStore();
