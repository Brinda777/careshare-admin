import React, { useEffect, useState } from "react";
import "../../css/AdminCustomer.css";
import AdminSidebar from "../../../components/AdminSidebar";
import {
  addEventApi,
  deleteEventApi,
  getEventsApi,
  updateEventApi,
} from "../../../apis/Api";
import EventModal from "../../../components/EventModal";
import { toast } from "react-toastify";

const AdminEvent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    getEventsApi(currentPage)
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const handleAddClick = () => {
    setEditEvent(null);
    setModalOpen(true);
  };

  const handleEditClick = (event) => {
    setEditEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (formData) => {
    if (editEvent) {
      // Update existing event
      updateEventApi(editEvent.id, formData)
        .then(() => {
          // Refetch or update the events list
          toast.success("Event has been updated.");
          setModalOpen(false);
        })
        .catch((err) => {
          toast.error("Event was not updated.");
        });
    } else {
      // Add new event
      addEventApi(formData)
        .then((res) => {
          // Refetch or update the events list
          toast.success("Event has been added.");
          setModalOpen(false);
        })
        .catch((err) => {
          toast.error("Event was not added.");
        });
    }
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure want to delete?");
    if (confirmDialog) {
      deleteEventApi(id)
        .then((res) => {
          toast.success("Event has been deleted.");
        })
        .catch((err) => {
          toast.error("Event was not deleted.");
        });
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1>Event List</h1>
            <div className="header-actions">
              <input
                type="text"
                placeholder="Search by event title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
              <button className="btn-add" onClick={handleAddClick}>
                Add
              </button>
            </div>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("id")}>ID</th>
                <th>Image</th>
                <th onClick={() => requestSort("title")}>Title</th>
                <th onClick={() => requestSort("description")}>Description</th>
                <th onClick={() => requestSort("impact")}>Impact</th>
                <th onClick={() => requestSort("disaster")}>
                  Disaster
                </th>
                <th onClick={() => requestSort("location")}>Location</th>

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
                            "/assets/images/default_image.png";
                        }}
                        style={{ objectFit: "cover" }}
                      />{" "}
                    </td>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                    <td>{event.impact}</td>
                    <td>{event.disaster}</td>
                    <td>{event.location}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEditClick(event)}
                        >
                          Edit
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
      <EventModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        event={editEvent}
      />
    </div>
  );
};

export default AdminEvent;
