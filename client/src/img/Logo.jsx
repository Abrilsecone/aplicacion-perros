import React from "react";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo-container">
      <a href="/breeds">
        <img alt="." src="assets/home.png" />
        <span>CanineConnect</span>
      </a>
    </div>
  );
}
