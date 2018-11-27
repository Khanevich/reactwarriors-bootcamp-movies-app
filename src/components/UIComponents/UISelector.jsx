import React from "react";

const UISelector = props => {
  const { id, name, options, value, labelText, onChange } = props;
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
};

export default UISelector;
