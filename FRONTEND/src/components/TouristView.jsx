import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { generateMockItinerary } from "../utils/planner";
import { MOCK_LOCAL_BUSINESSES } from "../data/mockData";
import "./TouristView.css";

// Cities list with High-Res Udaipur as default landing destination
const CITIES = [
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    tagline: "Lakes, palaces & slow sunsets",
    image: "https://plus.unsplash.com/premium_photo-1697729728192-c94f0bfa5b75?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D",
    lat: 24.5854,
    lon: 73.7125,
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    tagline: "Royal forts, pink streets & living heritage",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80",
    lat: 26.9124,
    lon: 75.7873,
  },
  {
    id: "jodhpur",
    name: "Jodhpur",
    state: "Rajasthan",
    tagline: "Blue lanes, Mehrangarh & desert stories",
    image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&auto=format&fit=crop&q=80",
    lat: 26.2389,
    lon: 73.0243,
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi",
    tagline: "Monuments, food trails & old-new contrasts",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80",
    lat: 28.6139,
    lon: 77.2090,
  },
  {
    id: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    tagline: "Mughal architecture & timeless riverfronts",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop&q=80",
    lat: 27.1767,
    lon: 78.0081,
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    tagline: "Beaches, Portuguese heritage & easy days",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
    lat: 15.2993,
    lon: 74.1240,
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    tagline: "Ghats, culture, craft & river rituals",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80",
    lat: 25.3176,
    lon: 82.9739,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    tagline: "Sea views, art deco & street food",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80",
    lat: 19.0760,
    lon: 72.8777,
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    tagline: "Golden Temple, heritage walk & street eats",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&auto=format&fit=crop&q=80",
    lat: 31.6340,
    lon: 74.8723,
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    tagline: "Yoga, river rafting & Himalayan peace",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80",
    lat: 30.0869,
    lon: 78.2676,
  },
];

const INTERESTS = [
  { name: "History", icon: "🏛️" },
  { name: "Architecture", icon: "🏰" },
  { name: "Photography", icon: "📸" },
  { name: "Handicrafts", icon: "🎨" },
  { name: "Culture", icon: "🎭" },
];

export default function TouristView({ activeTab, setActiveTab }) {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Live Weather States
  const [liveWeather, setLiveWeather] = useState("Loading...");
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Planner States
  const [budget, setBudget] = useState(5000);
  const [days, setDays] = useState(2);
  const [interests, setInterests] = useState(["History", "Photography"]);
  const [itinerary, setItinerary] = useState(null);

  // Filter cities for search inside modal
  const filteredCities = CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch Live Weather from Open-Meteo API
  useEffect(() => {
    async function fetchWeather() {
      setIsLoadingWeather(true);
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current_weather=true`
        );
        const data = await response.json();

        if (data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          setLiveWeather(`${temp}°C now`);
        } else {
          setLiveWeather("Weather unavailable");
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setLiveWeather("Weather unavailable");
      } finally {
        setIsLoadingWeather(false);
      }
    }

    fetchWeather();
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsModalOpen(false);
    setSearchQuery("");
    setItinerary(null);
  };

  const toggleInterest = (tag) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const result = generateMockItinerary({
      city: selectedCity.id,
      budget,
      days,
      interests,
    });
    setItinerary(result);
  };

  const acceptAlternative = (itemIndex, altPlace) => {
    const updated = [...itinerary];
    updated[itemIndex] = {
      ...updated[itemIndex],
      place: altPlace,
      isOvercrowded: false,
      alternativeSuggested: null,
      wasRerouted: true,
    };
    setItinerary(updated);
  };

  // Filter local businesses for the selected city
  const localGems = MOCK_LOCAL_BUSINESSES.filter(
    (b) => b.cityId === selectedCity.id
  );

  return (
    <div className="tourist-page">
      {/* REUSABLE NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setIsModalOpen={setIsModalOpen}
      />

      {/* LANDING HERO */}
      <section
        id="home-section"
        className="landing-hero"
        style={{ backgroundImage: `url(${selectedCity.image})` }}
      >
        <div className="hero-overlay">
          <div className="hero-top-tag">
            <span>✨ PERSONAL AI TRAVEL CONCIERGE</span>
          </div>

          <h1 className="hero-title">
            Go beyond the<br />
            <em>usual itinerary.</em>
          </h1>

          <p className="hero-subtitle">
            Tell us your days, budget and travel mood. Tourism360 builds a realistic route
            around real places, weather and crowd-pressure signals—then helps you change it
            when the city changes.
          </p>

          <div className="hero-actions">
            <a
              href="#planner-section"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (setActiveTab) setActiveTab("explore");
                document.getElementById("planner-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              ✨ Build my trip
            </a>
            <button className="btn-secondary" onClick={() => setIsModalOpen(true)}>
              Explore {selectedCity.name} →
            </button>
          </div>

          <div className="hero-footer-bar">
            <span>📍 {selectedCity.name}, {selectedCity.state}</span>
            <span>
              {isLoadingWeather ? "🌤️ Fetching weather..." : `🌤️ ${liveWeather}`}
            </span>
            <span>🛡️ Provider-verified facts</span>
          </div>
        </div>
      </section>

      {/* CITY SELECTION MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="city-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choose a Destination</h3>

              <div className="modal-search-box">
                <input
                  type="text"
                  placeholder="Search city or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery("")}>
                    ✕
                  </button>
                )}
              </div>

              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            {filteredCities.length === 0 ? (
              <div className="no-cities-found">
                <p>No destinations found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="cities-grid">
                {filteredCities.map((city) => (
                  <div
                    key={city.id}
                    className={`modal-city-card ${
                      selectedCity.id === city.id ? "selected" : ""
                    }`}
                    onClick={() => handleCitySelect(city)}
                  >
                    <div className="card-image-wrap">
                      <img src={city.image} alt={city.name} />
                    </div>
                    <div className="card-info">
                      <h4>{city.name}</h4>
                      <span className="card-state">{city.state}</span>
                      <p className="card-tagline">{city.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PLANNER LAYOUT */}
      <div id="planner-section" className="planner-layout">
        <aside className="planner-card">
          <div className="card-heading">
            <div className="heading-icon">🤖</div>
            <div>
              <h2>Plan Your Trip ({selectedCity.name})</h2>
              <p>Tell us what you love</p>
            </div>
          </div>

          <form onSubmit={handleGenerate}>
            <div className="form-section">
              <div className="label-row">
                <label>💰 Budget</label>
                <strong>₹{budget.toLocaleString()}</strong>
              </div>

              <input
                className="range"
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />

              <div className="range-labels">
                <span>₹1K</span>
                <span>₹20K</span>
              </div>
            </div>

            <div className="form-section">
              <div className="label-row">
                <label>🗓 Duration</label>
                <strong>{days} Days</strong>
              </div>

              <div className="day-selector">
                {[1, 2, 3, 4, 5].map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={days === day ? "active" : ""}
                    onClick={() => setDays(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="label-row">
                <label>❤️ Your Interests</label>
              </div>

              <div className="interest-grid">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest.name}
                    type="button"
                    className={
                      interests.includes(interest.name)
                        ? "interest active"
                        : "interest"
                    }
                    onClick={() => toggleInterest(interest.name)}
                  >
                    <span>{interest.icon}</span>
                    {interest.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="generate-btn" type="submit">
              ✨ Generate Smart Itinerary <span>→</span>
            </button>
          </form>

          {/* LOCAL DISCOVERIES */}
          <div className="local-section">
            <div className="section-title">
              <div>
                <h3>🏪 Local Discoveries</h3>
                <p>Hidden gems near you in {selectedCity.name}</p>
              </div>
              <button>View all</button>
            </div>

            {localGems.length > 0 ? (
              localGems.slice(0, 3).map((business) => (
                <div className="business-card" key={business.id}>
                  <div className="business-icon">
                    {business.type === "Cafe"
                      ? "☕"
                      : business.type === "Food"
                      ? "🍛"
                      : "🎨"}
                  </div>

                  <div className="business-info">
                    <strong>{business.name}</strong>
                    <span>📍 {business.distance}</span>
                    <small>Approx. {business.price}</small>
                  </div>

                  <button className="arrow-btn">→</button>
                </div>
              ))
            ) : (
              <p className="no-local-msg">
                No local discoveries listed for {selectedCity.name} yet.
              </p>
            )}
          </div>
        </aside>

        <main className="itinerary-area">
          <div className="itinerary-header">
            <div>
              <span className="eyebrow">YOUR PERSONALIZED PLAN</span>
              <h2>Smart Itinerary for {selectedCity.name}</h2>
            </div>

            {itinerary && (
              <div className="trip-summary">
                <span>💰 ₹{budget.toLocaleString()}</span>
                <span>🗓 {days} Days</span>
              </div>
            )}
          </div>

          {!itinerary ? (
            <div className="empty-state">
              <div className="empty-icon">🗺️</div>
              <h2>Your {selectedCity.name} adventure starts here</h2>
              <p>
                Select your preferences and let AI create a personalized travel
                plan for you.
              </p>

              <div className="empty-features">
                <div>
                  <span>🧠</span>
                  <strong>AI Planning</strong>
                  <small>Personalized routes</small>
                </div>

                <div>
                  <span>👥</span>
                  <strong>Crowd Aware</strong>
                  <small>Avoid busy places</small>
                </div>

                <div>
                  <span>🏪</span>
                  <strong>Local Gems</strong>
                  <small>Discover local businesses</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="timeline">
              {itinerary.map((item, idx) => {
                const crowd =
                  item.place.crowdLevel > 75
                    ? "high"
                    : item.place.crowdLevel > 50
                    ? "medium"
                    : "low";

                return (
                  <div className="timeline-item" key={idx}>
                    <div className="timeline-time">{item.slot}</div>

                    <div className="timeline-line">
                      <div className="timeline-dot">📍</div>
                    </div>

                    <div
                      className={`place-card ${
                        item.isOvercrowded ? "overcrowded" : ""
                      }`}
                    >
                      <img src={item.place.image} alt={item.place.name} />

                      <div className="place-content">
                        <div className="place-top">
                          <span className={`crowd-badge ${crowd}`}>
                            {crowd === "high"
                              ? "⚠️"
                              : crowd === "medium"
                              ? "👥"
                              : "✓"}{" "}
                            {item.place.crowdLevel}% Crowd
                          </span>

                          {item.wasRerouted && (
                            <span className="rerouted">
                              ✨ Smart Alternative
                            </span>
                          )}
                        </div>

                        <h3>{item.place.name}</h3>
                        <p>{item.place.description}</p>

                        {item.isOvercrowded && item.alternativeSuggested && (
                          <div className="smart-alert">
                            <div className="alert-icon">🧠</div>

                            <div>
                              <strong>Smart Route Suggestion</strong>
                              <p>
                                This place is currently crowded. Switch to{" "}
                                <b>{item.alternativeSuggested.name}</b> and save
                                around 45 minutes.
                              </p>

                              <button
                                onClick={() =>
                                  acceptAlternative(
                                    idx,
                                    item.alternativeSuggested
                                  )
                                }
                              >
                                Switch Place →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}