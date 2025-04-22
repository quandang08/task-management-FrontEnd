import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../../features/auth/AuthThunk";
 import { showNotification } from "../../../features/notification/NotificationSlice";

const SignUp = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });
  const [errors, setErrors] = useState({});

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

    try {
      await dispatch(register(formData)).unwrap();
      
      dispatch(showNotification({
        type: "success",
        message: "Đăng ký thành công. Vui lòng đăng nhập."
      }));
    } catch (error) {
      dispatch(showNotification({
        type: "error",
        message: error.message || "Đăng ký không thành công."
      }));
    }
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
          <option value="ROLE_CUSTOMER">ROLE_USER</option>
        </select>
      </div>

      <button className="btn-submit" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
