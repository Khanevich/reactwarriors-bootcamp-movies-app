import React from "react";
import UISelector from "../UIComponents/UISelector";

export default class PrimaryReleaseYear extends React.PureComponent {
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
    const { primary_release_year, onChangeFilters, options } = this.props;
    console.log("primary");
    return (
      <UISelector
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        options={options}
        labelText="Год резила:"
      />
    );
  }
}
