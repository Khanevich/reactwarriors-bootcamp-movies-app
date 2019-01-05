import React from "react";
import UISelector from "../UIComponents/UISelector";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class SortBy extends React.Component {
  static defaultProps = {
    options: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.asc"
      }
    ]
  };
  render() {
    console.log("sort_by");
    return (
      <UISelector
        id="sort_by"
        name="sort_by"
        value={this.props.moviesPageStore.filters.sort_by}
        onChange={this.props.moviesPageStore.onChangeFilters}
        options={this.props.options}
      />
    );
  }
}

export default SortBy;
