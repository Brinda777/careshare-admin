import axios from "axios";

// Create an axios instance
const Api = axios.create({
  baseURL:
    process.env["REACT_APP_BACKEND_BASE_URL"] || "http://localhost:8484/api",
  withCredentials: true,
});

// Function to get headers, including authorization if available
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
};

// Add a response interceptor to handle errors globally
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., show toast notifications, redirect on 401, etc.)
    return Promise.reject(error);
  }
);

// ** ==================== Authentication API ======================== ** //
export const loginUserApi = (data) => Api.post("/auth/login", data);
export const registerUserApi = (data) => Api.post("/auth/register", data);
export const oauthApi = (data) => Api.post("/auth/oauth", data);

// ** ==================== Users API ======================== ** //
export const changePasswordApi = (data) =>
  Api.patch(`/user/change-password`, data, getHeaders());
export const meApi = () => Api.get(`/user/me`, getHeaders());
export const updateUserApi = (data) =>
  Api.patch(`/user/me`, data, getHeaders());

// ** ==================== Admins API ======================== ** //
export const getCustomersApi = () => Api.get(`/user`, getHeaders());

// Events
export const getEventsApi = () => Api.get(`/event`, getHeaders());
export const addEventApi = (data) => Api.post(`/event`, data, getHeaders());
export const updateEventApi = (id, data) =>
  Api.patch(`/event/${id}`, data, getHeaders());
export const deleteEventApi = (id) => Api.delete(`/event/${id}`, getHeaders());

// Reports
export const getReportsApi = () => Api.get(`/report`, getHeaders());
export const deleteReportApi = (id) => Api.delete(`/report/${id}`, getHeaders());


// Donations
export const getDonationsApi = () => Api.get(`/donation`, getHeaders());
