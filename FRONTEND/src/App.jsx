import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TouristView from "./components/TouristView";
import HotelDashboard from "./components/HotelDashboard";
import TourismAdmin from "./components/TourismAdmin";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="app-container">
      {/* GLOBAL NAVBAR - Appears on every view */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* VIEW ROUTING */}
      <main className="main-content">
        {activeTab === "explore" && (
          <TouristView activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        {activeTab === "hotels" && <HotelDashboard />}
        {activeTab === "admin" && <TourismAdmin />}
      </main>
    </div>
  );
}