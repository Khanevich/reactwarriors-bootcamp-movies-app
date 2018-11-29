import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import PropTypes from "prop-types";

const User = props => {
  const { user } = props;
  return (
    <div>
      <img
        width="40"
        className="rounded-circle"
        src={`https://secure.gravatar.com/avatar/${
          user.avatar.gravatar.hash
        }.jpg?s=64"`}
        alt="avatar"
      />
    </div>
  );
};

// const UserContainer = props => {
//   return (
//     <AppContext.Consumer>
//       {context => {
//         console.log("user_context", context);
//         return <User user={context.user} {...props} />;
//       }}
//     </AppContext.Consumer>
//   );
// };

User.propTypes = {
  user: PropTypes.object
};

export default AppContextHOC(User);
