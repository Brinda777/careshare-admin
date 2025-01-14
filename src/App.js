import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import ProtectedRoute from './utils/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AdminEvent from './pages/admin/event/AdminEvent';
import AdminCustomer from './pages/admin/customer/AdminCustomer';
import AdminReport from './pages/admin/report/AdminReport';
import AdminDonation from './pages/admin/donation/AdminDonation';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <AdminEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminCustomer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <AdminReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute>
              <AdminDonation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
