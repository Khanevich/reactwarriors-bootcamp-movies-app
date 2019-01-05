import React from "react";
import UISelector from "../UIComponents/UISelector";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class PrimaryReleaseYear extends React.Component {
  static defaultProps = {
    options: [
      {
        label: "2018",
        value: "2018"
      },
      {
        label: "2017",
        value: "2017"
      },
      {
        label: "2016",
        value: "2016"
      },
      {
        label: "2015",
        value: "2015"
      }
    ]
  };

  render() {
    const {
      filters: { primary_release_year },
      onChangeFilters
    } = this.props.moviesPageStore;

    return (
      <UISelector
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        options={this.props.options}
        labelText="Год резила:"
      />
    );
  }
}

export default PrimaryReleaseYear;
