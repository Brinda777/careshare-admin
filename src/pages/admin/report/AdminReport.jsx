import React, { useEffect, useState } from "react";
import "../../css/AdminCustomer.css";
import AdminSidebar from "../../../components/AdminSidebar";
import {
  deleteReportApi,
  getReportsApi,
} from "../../../apis/Api";
import { toast } from "react-toastify";

const AdminReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReportsApi(currentPage)
      .then((res) => {
        setReports(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const handleEditClick = (event) => {
    toast.success("Report has been approved.");
  };


  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure want to delete?");
    if (confirmDialog) {
      deleteReportApi(id)
        .then((res) => {
          toast.success("Report has been deleted.");
        })
        .catch((err) => {
          toast.error("Report was not deleted.");
        });
    }
  };

  const filteredEvents = reports.filter((event) =>
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
            <h1>Report List</h1>
            <div className="header-actions">
            </div>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("id")}>ID</th>
                <th>Image</th>
                <th onClick={() => requestSort("reportedDate")}>Reported On</th>
                <th onClick={() => requestSort("reportedBy")}>Reported By</th>
                <th onClick={() => requestSort("impact")}>Impact</th>
                <th onClick={() => requestSort("disaster")}>
                  Disaster
                </th>
                <th onClick={() => requestSort("municipality")}>Municipality</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEvents
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>
                      <img
                        height={50}
                        width={50}
                        src={`${process.env.REACT_APP_BACKEND_IMAGE_BASE_URL}${event.image}`}
                        alt=""
                        srcset=""
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "/assets/images/default_image.webp";
                        }}
                        style={{ objectFit: "cover" }}
                      />{" "}
                    </td>
                    <td>{new Date(event.createdAt).toLocaleDateString()}</td>
                    <td>{event?.user?.fullName || event?.user?.phone}</td>
                    <td>{event.impact}</td>
                    <td>{event.disaster}</td>
                    <td>{`${event.address}, ${event.municipality}-${event.ward}`}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEditClick(event)}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
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

export default AdminReport;
