import React, { useEffect, useState } from "react";
import "../../css/AdminCustomer.css";
import AdminSidebar from "../../../components/AdminSidebar";
import {
  getDonationsApi,
} from "../../../apis/Api";

const AdminDonation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getDonationsApi(currentPage)
      .then((res) => {
        setDonations(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const filteredEvents = donations.filter((event) =>
    event.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="customer-table-container">
      <AdminSidebar />
      <div className="customer-table-content">
        <header className="header">
          <div className="header-top">
            <h1>Donation List</h1>
            <div className="header-actions">
            </div>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("id")}>ID</th>
                <th onClick={() => requestSort("donatedDate")}>Donated On</th>
                <th onClick={() => requestSort("donatedBy")}>Donated By</th>
                <th onClick={() => requestSort("event")}>Event</th>
                <th onClick={() => requestSort("eventType")}>Disaster</th>
                <th onClick={() => requestSort("impact")}>Type</th>
              </tr>
            </thead>
            <tbody>
              {sortedEvents
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{new Date(event.createdAt).toLocaleDateString()}</td>
                    <td>{event?.user?.fullName || event?.user?.phone}</td>
                    <td>{event?.event?.title || event?.event?.disaster}</td>
                    <td>{event?.event?.disaster}</td>
                    <td>{event.type}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredEvents.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDonation;
