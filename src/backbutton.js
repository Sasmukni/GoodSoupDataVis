import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

const BackButton = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const pathname_array = pathname.split("/");
  if(pathname.length > 1){
    pathname_array.pop();
    const new_pathname = pathname_array.join("/");

    return (
      <button
        className="back-button"
        onClick={() => navigate(new_pathname)}
        aria-label="Back to homepage"
      >
        ←
      </button>
    );
  }
  return (
    <></>
  )
};

export default BackButton;