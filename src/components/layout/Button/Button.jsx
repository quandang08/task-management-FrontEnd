import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`border-2 border-black py-2 px-4 font-bold uppercase tracking-wide ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };