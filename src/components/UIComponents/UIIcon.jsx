import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UIIcon = ({ iconName, onClick, isAdded, isLiked }) => {
  const iconStyle = isAdded ? "fas" : "far";
  return <FontAwesomeIcon icon={[iconStyle, iconName]} onClick={onClick} />;
};

export default UIIcon;
