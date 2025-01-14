import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const authUser = JSON.parse(localStorage.getItem("user"));

  // Navigate
  const navigate = useNavigate();

  // States
  const [countryCode, setCountryCode] = useState("+977"); // Default country code for Nepal
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // Error States
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle Error States
  const validate = () => {
    let isValid = true;

    // Validate phone number
    const phoneRegex = /^[0-9]{9,15}$/; // Minimum 9, maximum 15 digits
    if (!phoneNumber.trim()) {
      setPhoneError("Please enter phone number.");
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Please enter a valid phone number.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Please enter password.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = { phone: phoneNumber, password };
      const res = await loginUserApi(data);

      if (res.status !== 201) {
        toast.error(res.data?.message);
      } else {
        toast.success("Login Successful");
        localStorage.setItem("token", res.data?.token?.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err?.response?.status === 401 ? "Unauthorized" : err.response?.data?.message
      );
    }
  };

  return (
    <>
      {authUser ? (
        <Navigate to="/" />
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-6 image-container p-4">
              <img
                src="assets/images/auth.jpg"
                className="rounded img-fluid"
                alt="Main"
              />
            </div>
            <div className="col-md-6 p-4">
              <h1 className="mt-2">Welcome to CareShare Nepal</h1>
              <h2 className="mt-2 mb-4">Sign In To Continue.</h2>
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <div className="d-flex">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="form-select w-auto me-2"
                    >
                      <option value="+977">+977 (Nepal)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+1">+1 (USA)</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      type="text"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="form-control"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  {phoneError && (
                    <small className="text text-danger">{phoneError}</small>
                  )}
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                  {passwordError && (
                    <small className="text text-danger">{passwordError}</small>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-secondary w-50">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
