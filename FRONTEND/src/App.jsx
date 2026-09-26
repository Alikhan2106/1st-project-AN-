// src/App.jsx
import { useState } from 'react';
import TouristView from './components/TouristView';
import HotelDashboard from './components/HotelDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';



export default function App() {
  const [activeTab, setActiveTab] = useState('tourist');

  return (
    <div className="app-container">
      {/* Top Header & Navigation */}
      <header className="navbar">
        <div className="brand">
          <h2>🌐 Tourism360</h2>
          <span className="brand-badge">Smart Tourism Ecosystem</span>
        </div>

        <nav className="nav-tabs">
          <button 
            className={`nav-btn ${activeTab === 'tourist' ? 'active' : ''}`}
            onClick={() => setActiveTab('tourist')}
          >
            🎒 Tourist App
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'hotel' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            🏨 Hotel Dashboard
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            📊 Tourism Admin
          </button>
        </nav>
      </header>

      {/* Main View Container */}
      <main className="tab-content">
        {activeTab === 'tourist' && <TouristView />}
        {activeTab === 'hotel' && <HotelDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
}