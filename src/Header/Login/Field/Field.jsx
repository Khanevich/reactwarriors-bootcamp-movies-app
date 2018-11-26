import React from "react";

const Field = props => {
  const {
    id,
    labelText,
    type,
    placeholder,
    name,
    value,
    onChange,
    error,
    onBlur
  } = props;
  return (
    <div className="form-group">
      <label htmlFor="username">{labelText}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Field;
