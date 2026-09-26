import { useState } from 'react';
import './AdminDashboard.css';

const INITIAL_LOCATIONS = [
    {
        id: "1",
        name: "City Palace Complex",
        category: "Flagship Site",
        currentVisitors: 4850,
        capacity: 5000,
        status: "Critical",
        trend: "+18%",
        icon: "🏰"
    },
    {
        id: "2",
        name: "Lake Pichola Boating",
        category: "Flagship Site",
        currentVisitors: 2100,
        capacity: 2500,
        status: "High",
        trend: "+12%",
        icon: "🚤"
    },
    {
        id: "3",
        name: "Saheliyon Ki Bari",
        category: "Garden & Park",
        currentVisitors: 980,
        capacity: 1800,
        status: "Moderate",
        trend: "+4%",
        icon: "🌿"
    },
    {
        id: "4",
        name: "Ahar Cenotaphs",
        category: "Heritage Alternative",
        currentVisitors: 220,
        capacity: 1500,
        status: "Under-visited",
        trend: "-2%",
        icon: "🏛️"
    },
    {
        id: "5",
        name: "Shilpgram Craft Village",
        category: "Artisan Hub",
        currentVisitors: 410,
        capacity: 2000,
        status: "Under-visited",
        trend: "+8%",
        icon: "🏺"
    },
    {
        id: "6",
        name: "Bagore Ki Haveli",
        category: "Cultural Site",
        currentVisitors: 650,
        capacity: 1200,
        status: "Moderate",
        trend: "+5%",
        icon: "🎭"
    }
];

export default function AdminDashboard() {
    const [locations, setLocations] = useState(INITIAL_LOCATIONS);
    const [selectedFilter, setSelectedFilter] = useState('All');

    const totalTourists = locations.reduce(
        (sum, item) => sum + item.currentVisitors,
        0
    );

    const totalCapacity = locations.reduce(
        (sum, item) => sum + item.capacity,
        0
    );

    const cityOccupancy = Math.round(
        (totalTourists / totalCapacity) * 100
    );

    const criticalCount = locations.filter(
        item => item.status === 'Critical'
    ).length;

    const highCount = locations.filter(
        item => item.status === 'High'
    ).length;

    const underVisitedCount = locations.filter(
        item => item.status === 'Under-visited'
    ).length;

    const filteredLocations =
        selectedFilter === 'All'
            ? locations
            : locations.filter(
                location => location.status === selectedFilter
            );

    const getOccupancy = (location) => {
        return Math.round(
            (location.currentVisitors / location.capacity) * 100
        );
    };

    const getStatusClass = (location) => {
        const occupancy = getOccupancy(location);

        if (occupancy >= 85) return 'critical';
        if (occupancy >= 70) return 'high';
        if (occupancy >= 45) return 'moderate';

        return 'low';
    };

    const toggleRerouteRule = (id) => {
        setLocations(prev =>
            prev.map(loc => {
                if (loc.id !== id) return loc;

                const isCritical = loc.status === 'Critical';

                return {
                    ...loc,
                    status: isCritical ? 'Moderate' : 'Critical',
                    currentVisitors: isCritical
                        ? Math.max(0, loc.currentVisitors - 800)
                        : Math.min(loc.capacity, loc.currentVisitors + 800)
                };
            })
        );
    };

    return (
        <div className="admin-dashboard">

            {/* ================= HEADER ================= */}

            <header className="admin-header">

                <div>
                    <div className="admin-eyebrow">
                        TOURISM360 • DESTINATION CONTROL
                    </div>

                    <h1>
                        Udaipur Tourism Command Center
                    </h1>

                    <p>
                        Real-time visitor monitoring, crowd intelligence
                        and destination flow management.
                    </p>
                </div>

                <div className="system-status">
                    <span className="status-pulse"></span>

                    <div>
                        <strong>LIVE SYSTEM</strong>
                        <small>Telemetry active</small>
                    </div>
                </div>

            </header>


            {/* ================= KPI CARDS ================= */}

            <section className="admin-kpis">

                <div className="kpi-card">

                    <div className="kpi-top">
                        <span>ACTIVE VISITORS</span>
                        <div className="kpi-icon blue">👥</div>
                    </div>

                    <strong>
                        {totalTourists.toLocaleString()}
                    </strong>

                    <small>
                        ↑ Live visitor telemetry
                    </small>

                </div>


                <div className="kpi-card">

                    <div className="kpi-top">
                        <span>CITY OCCUPANCY</span>
                        <div className="kpi-icon purple">📊</div>
                    </div>

                    <strong>
                        {cityOccupancy}%
                    </strong>

                    <div className="mini-progress">
                        <div
                            style={{
                                width: `${cityOccupancy}%`
                            }}
                        />
                    </div>

                </div>


                <div className="kpi-card alert-card">

                    <div className="kpi-top">
                        <span>CONGESTION ALERTS</span>
                        <div className="kpi-icon red">⚠️</div>
                    </div>

                    <strong>
                        {criticalCount + highCount}
                    </strong>

                    <small>
                        {criticalCount} critical • {highCount} high
                    </small>

                </div>


                <div className="kpi-card">

                    <div className="kpi-top">
                        <span>QUIET ALTERNATIVES</span>
                        <div className="kpi-icon green">🌿</div>
                    </div>

                    <strong>
                        {underVisitedCount}
                    </strong>

                    <small>
                        Available for visitor redistribution
                    </small>

                </div>

            </section>


            {/* ================= MAIN GRID ================= */}

            <div className="admin-main-grid">

                {/* ================= CROWD OVERVIEW ================= */}

                <section className="crowd-overview panel">

                    <div className="panel-header">

                        <div>
                            <span className="panel-label">
                                CITY OVERVIEW
                            </span>

                            <h2>
                                Visitor Flow Monitor
                            </h2>

                            <p>
                                Current crowd pressure across monitored destinations.
                            </p>
                        </div>

                        <div className="live-badge">
                            <span></span>
                            LIVE
                        </div>

                    </div>


                    <div className="flow-visual">

                        <div
                            className="flow-ring"
                            style={{
                                '--occupancy': cityOccupancy
                            }}
                        >
                            <div>
                                <strong>{cityOccupancy}%</strong>
                                <span>City Load</span>
                            </div>
                        </div>


                        <div className="flow-stats">

                            <div>
                                <span className="legend red"></span>
                                <div>
                                    <strong>{criticalCount}</strong>
                                    <small>Critical</small>
                                </div>
                            </div>

                            <div>
                                <span className="legend orange"></span>
                                <div>
                                    <strong>{highCount}</strong>
                                    <small>High Traffic</small>
                                </div>
                            </div>

                            <div>
                                <span className="legend green"></span>
                                <div>
                                    <strong>{underVisitedCount}</strong>
                                    <small>Quiet Zones</small>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="flow-message">

                        <span>💡</span>

                        <div>
                            <strong>
                                Decongestion opportunity detected
                            </strong>

                            <p>
                                Under-visited destinations can receive
                                redirected visitors from high-pressure zones.
                            </p>
                        </div>

                    </div>

                </section>


                {/* ================= SMART ACTIONS ================= */}

                <section className="smart-actions panel">

                    <div className="panel-header">

                        <div>
                            <span className="panel-label">
                                AUTOMATION
                            </span>

                            <h2>
                                Smart Actions
                            </h2>
                        </div>

                    </div>


                    <div className="action-card">

                        <div className="action-icon red">
                            🚨
                        </div>

                        <div>
                            <strong>
                                Crowd Alert Engine
                            </strong>

                            <p>
                                Automatically detect locations crossing
                                safe capacity thresholds.
                            </p>
                        </div>

                        <span className="enabled">
                            ON
                        </span>

                    </div>


                    <div className="action-card">

                        <div className="action-icon blue">
                            🔀
                        </div>

                        <div>
                            <strong>
                                Smart Rerouting
                            </strong>

                            <p>
                                Suggest quieter destinations when congestion rises.
                            </p>
                        </div>

                        <span className="enabled">
                            ON
                        </span>

                    </div>


                    <div className="action-card">

                        <div className="action-icon green">
                            📍
                        </div>

                        <div>
                            <strong>
                                Alternative Discovery
                            </strong>

                            <p>
                                Promote under-visited local attractions.
                            </p>
                        </div>

                        <span className="enabled">
                            ON
                        </span>

                    </div>

                </section>

            </div>


            {/* ================= LOCATION MONITOR ================= */}

            <section className="location-panel panel">

                <div className="location-header">

                    <div>
                        <span className="panel-label">
                            DESTINATION MONITOR
                        </span>

                        <h2>
                            Attraction Traffic
                        </h2>

                        <p>
                            Monitor visitor density and trigger decongestion
                            actions in real time.
                        </p>
                    </div>


                    <div className="filter-container">

                        {[
                            'All',
                            'Critical',
                            'High',
                            'Moderate',
                            'Under-visited'
                        ].map(status => (

                            <button
                                key={status}
                                onClick={() => setSelectedFilter(status)}
                                className={
                                    selectedFilter === status
                                        ? 'filter active'
                                        : 'filter'
                                }
                            >
                                {status}
                            </button>

                        ))}

                    </div>

                </div>


                {/* TABLE HEADER */}

                <div className="location-table-header">

                    <span>DESTINATION</span>
                    <span>STATUS</span>
                    <span>CAPACITY</span>
                    <span>TREND</span>
                    <span>ACTION</span>

                </div>


                {/* LOCATIONS */}

                <div className="location-list">

                    {filteredLocations.map(location => {

                        const occupancy =
                            getOccupancy(location);

                        const statusClass =
                            getStatusClass(location);

                        return (

                            <div
                                className="location-row"
                                key={location.id}
                            >

                                {/* Destination */}

                                <div className="destination-cell">

                                    <div className="destination-icon">
                                        {location.icon}
                                    </div>

                                    <div>
                                        <strong>
                                            {location.name}
                                        </strong>

                                        <span>
                                            {location.category}
                                        </span>
                                    </div>

                                </div>


                                {/* Status */}

                                <div>

                                    <span
                                        className={`traffic-status ${statusClass}`}
                                    >
                                        <span></span>

                                        {location.status}
                                    </span>

                                </div>


                                {/* Capacity */}

                                <div className="capacity-cell">

                                    <div className="capacity-top">

                                        <span>
                                            {location.currentVisitors.toLocaleString()}
                                            {' / '}
                                            {location.capacity.toLocaleString()}
                                        </span>

                                        <strong>
                                            {occupancy}%
                                        </strong>

                                    </div>

                                    <div className="capacity-bar">

                                        <div
                                            className={statusClass}
                                            style={{
                                                width: `${Math.min(
                                                    occupancy,
                                                    100
                                                )}%`
                                            }}
                                        />

                                    </div>

                                </div>


                                {/* Trend */}

                                <div
                                    className={
                                        location.trend.startsWith('+')
                                            ? 'trend rising'
                                            : 'trend falling'
                                    }
                                >
                                    {location.trend.startsWith('+')
                                        ? '↑'
                                        : '↓'}{' '}
                                    {location.trend}
                                </div>


                                {/* Action */}

                                <button
                                    className={
                                        location.status === 'Critical'
                                            ? 'decongest-button'
                                            : 'simulate-button'
                                    }
                                    onClick={() =>
                                        toggleRerouteRule(location.id)
                                    }
                                >

                                    {location.status === 'Critical'
                                        ? '🔀 Decongest'
                                        : '⚡ Simulate'}

                                </button>

                            </div>

                        );

                    })}

                </div>

            </section>


            {/* ================= FOOTER INFO ================= */}

            <div className="admin-footer">

                <div>
                    <span className="footer-dot"></span>
                    Data stream operational
                </div>

                <span>
                    Tourism360 Intelligence Engine
                </span>

                <span>
                    Udaipur • Real-time monitoring
                </span>

            </div>

        </div>
    );
}