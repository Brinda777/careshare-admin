import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faSignOutAlt,
  faAmbulance,
  faFire,
  faDonate,
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear user session
    navigate("/login"); // Proper redirection
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <h3 className="profile-name">Admin Panel</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="sidebar-icon"
              />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/customers"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/events"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faAmbulance} className="sidebar-icon" />
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/artists"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faFire} className="sidebar-icon" />
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/artists"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faDonate} className="sidebar-icon" />
              Donations
            </NavLink>
          </li>
          <li>
            <a onClick={handleLogout} className="logout-button">
              <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
