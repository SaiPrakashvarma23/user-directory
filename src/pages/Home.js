import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { FaMoon, FaSun } from "react-icons/fa"; // Importing moon and sun icons for theme toggle
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // 'asc' for A-Z, 'desc' for Z-A
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [usersPerPage] = useState(6); // Number of users per page
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Dark/Light mode

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setSortedUsers(response.data); // Initially display unsorted users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);

    const sorted = [...users].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (order === "asc") {
        return nameA.localeCompare(nameB); // A-Z
      } else if (order === "desc") {
        return nameB.localeCompare(nameA); // Z-A
      } else {
        return 0; // Default
      }
    });

    setSortedUsers(sorted);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Dark/Light mode toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`home-container ${theme}`}>
      <div className="header-container">
        {/* Moon/Sun Icon for Dark/Light Mode */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        {/* Centered Header */}
        <h1 className="home-header">User Directory</h1>
        {/* Sorting section on the right */}
        <div className="sort-container">
          <label htmlFor="sort">Sort Users:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Display filtered and sorted users */}
      <div className="user-cards-container">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
