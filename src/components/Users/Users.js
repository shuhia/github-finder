import React from "react";
import UserItem from "./UserItem.js";
import Spinner from "../layout/Spinner";
import Proptypes from "prop-types";

const Users = function ({ users, loading }) {
  if (loading) {
    return <Spinner />;
  } else
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user}></UserItem>
        ))}
      </div>
    );
};

Users.propTypes = {
  users: Proptypes.array.isRequired,
  loading: Proptypes.bool.isRequired,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
