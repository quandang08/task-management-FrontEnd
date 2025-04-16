import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
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
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Sign Up submitted:", formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="error-text">{errors.fullName}</p>}
      </div>

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

      <div className="input-group">
        <label>Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="styled-select"
        >
          <option value="ROLE_USER">ROLE_USER</option>
          <option value="ROLE_ADMIN">ROLE_ADMIN</option>
        </select>
      </div>

      <button className="btn-submit" type="submit" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;
