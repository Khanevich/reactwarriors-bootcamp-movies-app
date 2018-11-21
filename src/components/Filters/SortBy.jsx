import React from "react";
import PropTypes from "prop-types";
import UISelector from "../UIComponents/UISelector";

export default class SortBy extends React.PureComponent {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };
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
    const { sort_by, onChangeFilters, options } = this.props;
    return (
      <UISelector
        id="sort_by"
        name="sort_by"
        value={sort_by}
        onChange={onChangeFilters}
        options={options}
      />
    );
  }
}
