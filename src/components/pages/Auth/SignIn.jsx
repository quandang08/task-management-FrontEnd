import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/AuthThunk";

const SignIn = ({ togglePanel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }

    setErrors({});
    try {
      const user = await dispatch(login(formData)).unwrap();
      console.log("Login success:", user);
    } catch (error) {
      setErrors({ general: error });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <p className="error-text">{errors.general}</p>}
      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      <button className="btn-submit" type="submit">
        Sign In
      </button>

      <p>
        Don't have an account?{" "}
        <span onClick={() => togglePanel("register")} className="link">
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default SignIn;
