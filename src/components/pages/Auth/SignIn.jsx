import React from "react";

const SignIn = () => {
  return (
    <>
      <div className="input-group">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>
      <button className="btn-submit">Sign In</button>
    </>
  );
};

export default SignIn;
