import React from "react";

export default class UISelector extends React.Component {
  render() {
    const { id, name, options, value, labelText, onChange } = this.props;
    console.log("UISelector render");
    return (
      <div className="form-group">
        <label htmlFor="sort_by">{labelText}</label>
        <select
          id={id}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
