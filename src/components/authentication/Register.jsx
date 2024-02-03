import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    medicalHistory: "",
  });

  const { isLoggedIn, storeTokenInLS, API } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/home");
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your backend API endpoint is /api/register
      const response = await fetch("http://localhost:5001/registering", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      } else {
        const result = await response.json();
        storeTokenInLS(result.token);
        console.log("Registration successful:", result);
        toast.success("Registration successful");
        // navigate("/home");
      }

      // Do something with the result if needed
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed");
    }
    setInput({
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      medicalHistory: "",
    });
  };

  return (
    <div className="container mt-5">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter your Username"
            value={input.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="pass"
            type={showPassword ? "text" : "password"}
            className="form-control"
            name="password"
            placeholder="Enter your Password"
            value={input.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            id="button1"
            className="btn button1 btn-primary"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={input.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter your phone"
            value={input.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            name="age"
            placeholder="Enter your age"
            value={input.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className="form-control"
            name="gender"
            placeholder="Enter your gender"
            value={input.gender}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="medicalHistory" className="form-label">
            Medical History
          </label>
          <textarea
            className="form-control"
            name="medicalHistory"
            value={input.medicalHistory}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button type="submit" id="button1" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
