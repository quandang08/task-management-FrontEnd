import React, { useState } from "react";

const SignUp = () => {
  const [role, setRole] = useState("ROLE_USER");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <div className="input-group">
        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" />
      </div>
      <div className="input-group">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>
      <div className="input-group">
        <label>Role</label>
        <select value={role} onChange={handleRoleChange} className="styled-select">
          <option value="ROLE_USER">ROLE_USER</option>
          <option value="ROLE_ADMIN">ROLE_ADMIN</option>
        </select>
      </div>
      <button className="btn-submit">Sign Up</button>
    </>
  );
};

export default SignUp;
