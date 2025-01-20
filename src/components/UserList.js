import React from "react";
import UserCard from "./UserCard";
import "./UserList.css";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
