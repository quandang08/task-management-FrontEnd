import React, { useState, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "./Auth.css";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const nodeRef = useRef(null);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-image">
          <img src="https://i.pinimg.com/736x/80/4d/79/804d79d90c93ac175153812460a9c50d.jpg" alt="" />
        </div>

        <div className="auth-form">
          <div className="glass-box">
            <h2 className="title">TASCO</h2>
            <div className="tabs">
              <button
                className={`tab ${isRegister ? "active" : ""}`}
                onClick={() => setIsRegister(true)}
              >
                Sign Up
              </button>
              <button
                className={`tab ${!isRegister ? "active" : ""}`}
                onClick={() => setIsRegister(false)}
              >
                Sign In
              </button>
            </div>

            <SwitchTransition mode="out-in">
              <CSSTransition
                key={isRegister ? "signup" : "signin"}
                timeout={300}
                classNames="fade"
                unmountOnExit
                nodeRef={nodeRef}
              >
                <div ref={nodeRef} className="form-content">
                  {isRegister ? <SignUp /> : <SignIn />}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
