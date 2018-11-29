import React from "react";

const Genres = ({ genresList, with_genres, onChange }) => (
  <React.Fragment>
    {genresList.map(genre => (
      <div key={genre.id} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={genre.id}
          id={`genre${genre.id}`}
          onChange={onChange}
          checked={with_genres.includes(String(genre.id))}
        />
        <label className="form-check-label" htmlFor={`genre${genre.id}`}>
          {genre.name}
        </label>
      </div>
    ))}
  </React.Fragment>
);

export default Genres;
