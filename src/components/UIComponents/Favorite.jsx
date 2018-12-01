import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContextHOC from "../HOC/AppContextHOC";
import AddFavoriteHOC from "../HOC/AddFavoriteHOC";

const Favorite = ({ icon_name, icon_style, isAdded, onAddFavorites }) => {
  const styleWatch = isAdded ? "fas" : "far";
  return (
    <div className="heart" onClick={onAddFavorites(icon_name)}>
      <FontAwesomeIcon icon={[styleWatch, icon_style]} />
    </div>
  );
};

export default AppContextHOC(AddFavoriteHOC(Favorite));
