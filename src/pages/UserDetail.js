import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaPhone, FaBuilding, FaGlobe } from "react-icons/fa";
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );

  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="user-detail-container">
      <button className="go-back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="back-icon" /> Go Back
      </button>

      <div className="user-details">
        <h1 className="user-detail-header">{user.name}</h1>
        <div className="user-detail-row">
          <FaEnvelope className="detail-icon" />
          <span>{user.email}</span>
        </div>
        <div className="user-detail-row">
          <FaPhone className="detail-icon" />
          <span>{user.phone}</span>
        </div>
        <div className="user-detail-row">
          <FaBuilding className="detail-icon" />
          <span>{user.company.name}</span>
        </div>
        <div className="user-detail-row">
          <FaGlobe className="detail-icon" />
          <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
        </div>
      </div>

    </div>
  );
};

export default UserDetail;
