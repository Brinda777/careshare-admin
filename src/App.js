import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Login from './pages/authentication/Login';
import ProtectedRoute from './utils/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
