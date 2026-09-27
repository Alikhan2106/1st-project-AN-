import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ activeTab, setActiveTab, selectedCity, setIsModalOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for Dynamic Island transformation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Navbar Navigation (Tab Switching & Smooth Scroll)
  const handleNavClick = (e, tabId, sectionId) => {
    e.preventDefault();
    if (setActiveTab) {
      setActiveTab(tabId);
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className={`top-navbar ${isScrolled ? "dynamic-island" : ""}`}>
      <div className="nav-brand">
        <strong>Tourism360</strong>
        <span className="brand-badge">Smart Tourism Ecosystem</span>
      </div>

      <div className="nav-links">
        <a
          href="#home-section"
          className={activeTab === "explore" ? "active" : ""}
          onClick={(e) => handleNavClick(e, "explore", "home-section")}
        >
          Home
        </a>
        <a
          href="#home-section"
          onClick={(e) => handleNavClick(e, "explore", "home-section")}
        >
          Explore
        </a>
        <a
          href="#planner-section"
          onClick={(e) => handleNavClick(e, "explore", "planner-section")}
        >
          AI Planner
        </a>
        <a
          href="#hotels"
          className={activeTab === "hotels" ? "active" : ""}
          onClick={(e) => handleNavClick(e, "hotels")}
        >
          Hotel Dashboard
        </a>
        <a
          href="#admin"
          className={activeTab === "admin" ? "active" : ""}
          onClick={(e) => handleNavClick(e, "admin")}
        >
          Tourism Admin
        </a>
      </div>

      {selectedCity && setIsModalOpen && (
        <button className="location-btn" onClick={() => setIsModalOpen(true)}>
          📍 {selectedCity.name} <span>›</span>
        </button>
      )}
    </nav>
  );
}