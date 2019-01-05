import { observable, action } from "mobx";

export default class MoviesPageStore {
  @observable
  filters = {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  };
  @observable
  page = 1;
  @observable
  total_pages = "";

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
    // this.setState({
    //   filters: {
    //     sort_by: "popularity.desc",
    //     primary_release_year: "2018",
    //     with_genres: []
    //   },
    //   page: 1
    // });
    this.filters = {
      sort_by: "popularity.desc",
      primary_release_year: "2018",
      with_genres: []
    };
  };

  @action
  getTotalPages = total_pages => {
    // this.setState({
    //   total_pages
    // });
    this.total_pages = total_pages;
  };
}

export const moviesPageStore = new MoviesPageStore();
