import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaCity, FaArrowRight } from "react-icons/fa";
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-details">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-info">
          <FaEnvelope className="icon" /> {user.email}
        </p>
        <p className="user-info">
          <FaCity className="icon" /> {user.address.city}
        </p>
        <Link to={`/user/${user.id}`} className="view-details-link">
          View Details <FaArrowRight className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
