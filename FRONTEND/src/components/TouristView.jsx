import { useState } from "react";
import { generateMockItinerary } from "../utils/planner";
import { MOCK_LOCAL_BUSINESSES } from "../data/mockData";
import "./TouristView.css";

const INTERESTS = [
  { name: "History", icon: "🏛️" },
  { name: "Architecture", icon: "🏰" },
  { name: "Photography", icon: "📸" },
  { name: "Handicrafts", icon: "🎨" },
  { name: "Culture", icon: "🎭" },
];

export default function TouristView() {
  const [budget, setBudget] = useState(5000);
  const [days, setDays] = useState(2);
  const [interests, setInterests] = useState([
    "History",
    "Photography",
  ]);
  const [itinerary, setItinerary] = useState(null);

  const toggleInterest = (tag) => {
    setInterests((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    const result = generateMockItinerary({
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

  return (
    <div className="tourist-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ AI Powered Travel Planning
          </div>

          <h1>
            Explore <span>Udaipur</span>
            <br />
            Your Way.
          </h1>

          <p>
            Build a personalized itinerary based on your budget,
            interests and real-time crowd conditions.
          </p>

          <div className="hero-stats">
            <div>
              <strong>50+</strong>
              <span>Places</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Smart Routes</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Planning</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="floating-card">
            <span>📍</span>
            <div>
              <strong>Udaipur, Rajasthan</strong>
              <small>City of Lakes</small>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="planner-layout">

        {/* LEFT SIDEBAR */}
        <aside className="planner-card">

          <div className="card-heading">
            <div className="heading-icon">🤖</div>
            <div>
              <h2>Plan Your Trip</h2>
              <p>Tell us what you love</p>
            </div>
          </div>

          <form onSubmit={handleGenerate}>

            {/* BUDGET */}
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
                onChange={(e) =>
                  setBudget(Number(e.target.value))
                }
              />

              <div className="range-labels">
                <span>₹1K</span>
                <span>₹20K</span>
              </div>
            </div>

            {/* DAYS */}
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

            {/* INTERESTS */}
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
                    onClick={() =>
                      toggleInterest(interest.name)
                    }
                  >
                    <span>{interest.icon}</span>
                    {interest.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="generate-btn" type="submit">
              ✨ Generate Smart Itinerary
              <span>→</span>
            </button>

          </form>

          {/* LOCAL DISCOVERIES */}
          <div className="local-section">
            <div className="section-title">
              <div>
                <h3>🏪 Local Discoveries</h3>
                <p>Hidden gems near you</p>
              </div>

              <button>View all</button>
            </div>

            {MOCK_LOCAL_BUSINESSES.slice(0, 3).map((business) => (
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

                  <span>
                    📍 {business.distance}
                  </span>

                  <small>
                    Approx. {business.price}
                  </small>
                </div>

                <button className="arrow-btn">→</button>
              </div>
            ))}
          </div>

        </aside>

        {/* RIGHT SIDE */}
        <main className="itinerary-area">

          <div className="itinerary-header">
            <div>
              <span className="eyebrow">YOUR PERSONALIZED PLAN</span>
              <h2>Smart Itinerary</h2>
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

              <div className="empty-icon">
                🗺️
              </div>

              <h2>Your Udaipur adventure starts here</h2>

              <p>
                Select your preferences and let AI create
                a personalized travel plan for you.
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

                    <div className="timeline-time">
                      {item.slot}
                    </div>

                    <div className="timeline-line">
                      <div className="timeline-dot">
                        📍
                      </div>
                    </div>

                    <div
                      className={`place-card ${
                        item.isOvercrowded
                          ? "overcrowded"
                          : ""
                      }`}
                    >

                      <img
                        src={item.place.image}
                        alt={item.place.name}
                      />

                      <div className="place-content">

                        <div className="place-top">

                          <span
                            className={`crowd-badge ${crowd}`}
                          >
                            {crowd === "high"
                              ? "⚠️"
                              : crowd === "medium"
                              ? "👥"
                              : "✓"}
                            {" "}
                            {item.place.crowdLevel}% Crowd
                          </span>

                          {item.wasRerouted && (
                            <span className="rerouted">
                              ✨ Smart Alternative
                            </span>
                          )}

                        </div>

                        <h3>{item.place.name}</h3>

                        <p>
                          {item.place.description}
                        </p>

                        {/* CROWD ALERT */}
                        {item.isOvercrowded &&
                          item.alternativeSuggested && (
                            <div className="smart-alert">

                              <div className="alert-icon">
                                🧠
                              </div>

                              <div>
                                <strong>
                                  Smart Route Suggestion
                                </strong>

                                <p>
                                  This place is currently
                                  crowded. Switch to{" "}
                                  <b>
                                    {
                                      item
                                        .alternativeSuggested
                                        .name
                                    }
                                  </b>{" "}
                                  and save around 45 minutes.
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