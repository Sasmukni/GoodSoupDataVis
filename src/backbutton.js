import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => navigate("/")}
      aria-label="Back to homepage"
    >
      ←
    </button>
  );
};

export default BackButton;