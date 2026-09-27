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
      
      {/* Main View Container */}
      <main className="tab-content">
        {activeTab === 'tourist' && <TouristView />}
        {activeTab === 'hotel' && <HotelDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
}