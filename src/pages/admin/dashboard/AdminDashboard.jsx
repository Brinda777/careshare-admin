import React, { useEffect, useState } from "react";
import "../../css/AdminDashboard.css";
import AdminSidebar from "../../../components/AdminSidebar";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  getCustomersApi,
  getDonationsApi,
  getEventsApi,
  getReportsApi,
} from "../../../apis/Api";

ChartJS.register(...registerables);

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [donationsCount, setDonationsCount] = useState(0);
  const [error, setError] = useState(null);

  const [randomAnalytics, setRandomAnalytics] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          customersResponse,
          eventsResponse,
          reportsResponse,
          donationsResponse,
        ] = await Promise.all([
          getCustomersApi(),
          getEventsApi(),
          getReportsApi(),
          getDonationsApi(),
        ]);

        setUsersCount(customersResponse.data.meta.total);
        setEventsCount(eventsResponse.data.meta.total);
        setReportsCount(reportsResponse.data.meta.total);
        setDonationsCount(donationsResponse.data.meta.total);

        // Generate random analytics
        setRandomAnalytics({
          averageReportsPerEvent:
            eventsResponse.data.meta.total > 0
              ? (reportsResponse.data.meta.total / eventsResponse.data.meta.total).toFixed(2)
              : 0,
          donationRate: (
            (donationsResponse.data.meta.total / customersResponse.data.meta.total) *
            100
          ).toFixed(2),
          activeUsers: Math.floor(
            Math.random() * (customersResponse.data.meta.total - 10) + 10
          ),
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data
  const barChartData = {
    labels: ["Users", "Events", "Reports", "Donations"],
    datasets: [
      {
        label: "Counts",
        data: [usersCount, eventsCount, reportsCount, donationsCount],
        backgroundColor: ["#8E4585", "#ffcc00", "#ff6347", "#4682b4"],
        borderColor: ["#8E4585", "#ffcc00", "#ff6347", "#4682b4"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Reports per Event", "Donation Rate (%)", "Active Users"],
    datasets: [
      {
        label: "Analytics",
        data: [
          randomAnalytics.averageReportsPerEvent || 0,
          randomAnalytics.donationRate || 0,
          randomAnalytics.activeUsers || 0,
        ],
        backgroundColor: ["#8E4585", "#ffcc00", "#ff6347"],
        hoverOffset: 4,
      },
    ],
  };

  const lineChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "User Growth",
        data: [200, 300, 450, usersCount], // Replace with dynamic data if available
        fill: false,
        borderColor: "#8E4585",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <header className="header">
          <h1>Dashboard</h1>
        </header>
        {error && <p className="error-message">{error}</p>}
        <div className="dashboard-cards-container">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Total Users</h3>
            </div>
            <p className="dashboard-card-value">{usersCount}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Events</h3>
            </div>
            <p className="dashboard-card-value">{eventsCount}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Reports</h3>
            </div>
            <p className="dashboard-card-value">{reportsCount}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Event Engagements</h3>
            </div>
            <p className="dashboard-card-value">{donationsCount}</p>
          </div>
        </div>

        {/* Analytics Charts */}
       <div className="dashboard-analytics">
        <h2>Analytics</h2>
        <div className="chart-grid">
          <div className="chart-container">
            <h3>Bar Chart: Overview</h3>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          <div className="chart-container">
            <h3>Pie Chart: Key Metrics</h3>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          <div className="chart-container">
            <h3>Line Chart: User Growth</h3>
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
