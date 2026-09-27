import { useState } from "react";
import {
  MapPin,
  Users,
  Sparkles,
  Target,
  Landmark,
  Clock3,
  Handshake,
  Wallet,
  BedDouble,
  Heart,
  CheckCircle2,
  Plus,
  Send,
  Hotel,
  WandSparkles,
} from "lucide-react";

import "./HotelDashboard.css";

// =========================================================
// MOCK CHECKED-IN GUESTS
// =========================================================

const INITIAL_GUESTS = [
  {
    id: "g101",
    name: "Aarav Sharma",
    room: "304",
    stayDays: "2 Days",
    budget: "₹6,000",
    interests: ["History", "Architecture", "Local Food"],
    status: "Checked In",
    recommendedPackage: null,
  },
  {
    id: "g102",
    name: "Priya & Rohan",
    room: "212",
    stayDays: "3 Days",
    budget: "₹12,000",
    interests: ["Photography", "Handicrafts", "Culture"],
    status: "Checked In",
    recommendedPackage: "Mewari Artisan Special",
  },
];

// =========================================================
// LOCAL EXPERIENCE PACKAGES
// =========================================================

const INITIAL_PACKAGES = [
  {
    id: "p1",
    title: "Heritage & Street Food Walk",
    price: "₹1,299",
    duration: "3 Hours",
    includes: "Local Guide + City Walk + 4 Food Tastings",
    vendorPartner: "Old City Artisan Guild",
    icon: "🍜",
    category: "Food & Heritage",
  },
  {
    id: "p2",
    title: "Mewari Artisan Special",
    price: "₹1,899",
    duration: "Half Day",
    includes: "Shilpgram Pottery Class + Private Auto Transport",
    vendorPartner: "Udaipur Handicrafts Co-op",
    icon: "🏺",
    category: "Culture & Craft",
  },
];


// =========================================================
// HELPER — INITIALS
// =========================================================

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};


// =========================================================
// COMPONENT
// =========================================================

export default function HotelDashboard() {
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);

  const [selectedGuest, setSelectedGuest] = useState(
    INITIAL_GUESTS[0]
  );

  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newIncludes, setNewIncludes] = useState("");
  const [newPartner, setNewPartner] = useState("");


  // =======================================================
  // CREATE PACKAGE
  // =======================================================

  const handleCreatePackage = (e) => {
    e.preventDefault();

    if (!newTitle.trim() || !newPrice.trim()) {
      return;
    }

    const created = {
      id: `p${Date.now()}`,
      title: newTitle.trim(),
      price: `₹${newPrice}`,
      duration: newDuration.trim() || "3 Hours",
      includes:
        newIncludes.trim() ||
        "Curated local experience",
      vendorPartner:
        newPartner.trim() ||
        "Local Vendor Partner",
      icon: "✨",
      category: "Custom Experience",
    };

    setPackages((prev) => [...prev, created]);

    setNewTitle("");
    setNewPrice("");
    setNewDuration("");
    setNewIncludes("");
    setNewPartner("");
  };


  // =======================================================
  // ASSIGN PACKAGE
  // =======================================================

  const assignPackageToGuest = (packageTitle) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === selectedGuest.id
          ? {
            ...guest,
            recommendedPackage: packageTitle,
          }
          : guest
      )
    );

    setSelectedGuest((prev) => ({
      ...prev,
      recommendedPackage: packageTitle,
    }));
  };


  // =======================================================
  // CURRENT RECOMMENDATION
  // =======================================================

  const recommendedPackage =
    packages.find(
      (pkg) =>
        pkg.title === selectedGuest.recommendedPackage
    ) || null;


  // =======================================================
  // STATISTICS
  // =======================================================

  const recommendationCount = guests.filter(
    (guest) => guest.recommendedPackage
  ).length;


  return (
    <div className="hotel-dashboard">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="hotel-header">

        <div>
          <div className="eyebrow">
            <Hotel size={13} />
            HOTEL PARTNER
          </div>

          <h1>
            Hospitality Command Center
          </h1>

          <p>
            Manage guests, discover their interests and create
            memorable local experiences.
          </p>
        </div>


        <div className="hotel-location">

          <span>
            <MapPin size={19} />
          </span>

          <div>
            <strong>Udaipur</strong>
            <small>Rajasthan, India</small>
          </div>

        </div>

      </header>


      {/* ===================================================
          STATS
      =================================================== */}

      <section className="hotel-stats">

        {/* Guests */}

        <div className="stat-card">

          <div className="stat-icon blue">
            <Users size={21} />
          </div>

          <div>
            <span>Checked-in Guests</span>

            <strong>
              {guests.length}
            </strong>

            <small>
              Active stays
            </small>
          </div>

        </div>


        {/* Packages */}

        <div className="stat-card">

          <div className="stat-icon green">
            <Sparkles size={21} />
          </div>

          <div>
            <span>Packages</span>

            <strong>
              {packages.length}
            </strong>

            <small>
              Experiences available
            </small>
          </div>

        </div>


        {/* Recommendations */}

        <div className="stat-card">

          <div className="stat-icon purple">
            <Target size={21} />
          </div>

          <div>
            <span>Recommendations</span>

            <strong>
              {recommendationCount}
            </strong>

            <small>
              Guest matches
            </small>
          </div>

        </div>


        {/* Partners */}

        <div className="stat-card">

          <div className="stat-icon orange">
            <Landmark size={21} />
          </div>

          <div>
            <span>Local Partners</span>

            <strong>
              8
            </strong>

            <small>
              Artisans & vendors
            </small>
          </div>

        </div>

      </section>


      {/* ===================================================
          MAIN LAYOUT
      =================================================== */}

      <div className="hotel-layout">


        {/* =================================================
            GUEST SIDEBAR
        ================================================= */}

        <aside className="guest-sidebar">

          <div className="section-heading">

            <div>
              <h2>
                Guest Roster
              </h2>

              <span>
                Currently staying
              </span>
            </div>

            <span className="live-dot">
              Live
            </span>

          </div>


          <div className="guest-list">

            {guests.map((guest) => {

              const isSelected =
                selectedGuest.id === guest.id;

              return (
                <div
                  key={guest.id}
                  className={`guest-card ${isSelected ? "active" : ""
                    }`}
                  onClick={() =>
                    setSelectedGuest(guest)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" ||
                      e.key === " "
                    ) {
                      setSelectedGuest(guest);
                    }
                  }}
                >

                  <div className="guest-avatar">
                    {getInitials(guest.name)}
                  </div>


                  <div className="guest-info">

                    <div className="guest-name-row">

                      <strong>
                        {guest.name}
                      </strong>

                      <span className="room-number">
                        Room {guest.room}
                      </span>

                    </div>


                    <span className="guest-meta">
                      {guest.stayDays} • {guest.budget}
                    </span>


                    {guest.recommendedPackage && (
                      <span className="assigned-label">
                        <CheckCircle2 size={11} />
                        Package assigned
                      </span>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </aside>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="hotel-main">


          {/* =================================================
              GUEST PROFILE
          ================================================= */}

          <section className="profile-card">

            <div className="profile-top">

              <div className="profile-user">

                <div className="large-avatar">
                  {getInitials(selectedGuest.name)}
                </div>

                <div>

                  <span className="profile-label">
                    CURRENT GUEST
                  </span>

                  <h2>
                    {selectedGuest.name}
                  </h2>

                  <p>
                    Room {selectedGuest.room} •{" "}
                    {selectedGuest.stayDays}
                  </p>

                </div>

              </div>


              <span className="checked-status">
                {selectedGuest.status}
              </span>

            </div>


            {/* Guest Details */}

            <div className="guest-details">

              <div className="detail-box">

                <span>
                  <Wallet size={12} />
                  Trip Budget
                </span>

                <strong>
                  {selectedGuest.budget}
                </strong>

              </div>


              <div className="detail-box">

                <span>
                  <BedDouble size={12} />
                  Stay Duration
                </span>

                <strong>
                  {selectedGuest.stayDays}
                </strong>

              </div>


              <div className="detail-box interests-box">

                <span>
                  <Heart size={12} />
                  Interests
                </span>

                <div className="interest-list">

                  {selectedGuest.interests.map(
                    (interest) => (
                      <span key={interest}>
                        {interest}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              SMART RECOMMENDATION
          ================================================= */}

          <section className="ai-recommendation">

            <div className="ai-icon">
              <WandSparkles size={22} />
            </div>


            <div className="ai-content">

              <span>
                TOURISM360 SMART MATCH
              </span>

              <h3>
                {recommendedPackage
                  ? `Recommended: ${recommendedPackage.title}`
                  : "Find the perfect local experience"}
              </h3>

              <p>
                {recommendedPackage
                  ? `This experience has been assigned to ${selectedGuest.name} based on their interests.`
                  : "Match this guest with a curated local experience based on their interests and budget."}
              </p>

            </div>


            <div className="match-score">

              <strong>
                {recommendedPackage ? "96%" : "AI"}
              </strong>

              <span>
                {recommendedPackage
                  ? "Match"
                  : "Smart"}
              </span>

            </div>

          </section>


          {/* =================================================
              PACKAGES
          ================================================= */}

          <section>

            <div className="content-heading">

              <div>

                <span className="section-label">
                  LOCAL EXPERIENCES
                </span>

                <h2>
                  Curated Packages
                </h2>

                <p>
                  Recommend authentic Udaipur experiences
                  to your guests.
                </p>

              </div>


              <span className="package-count">
                {packages.length} Experiences
              </span>

            </div>


            <div className="package-grid">

              {packages.map((pkg) => {

                const isAssigned =
                  selectedGuest.recommendedPackage ===
                  pkg.title;

                return (

                  <article
                    key={pkg.id}
                    className={`package-card ${isAssigned ? "assigned" : ""
                      }`}
                  >

                    <div className="package-image">

                      <span>
                        {pkg.icon}
                      </span>


                      <div className="package-category">
                        {pkg.category}
                      </div>


                      {isAssigned && (
                        <div className="assigned-badge">
                          ✓ Assigned
                        </div>
                      )}

                    </div>


                    <div className="package-body">

                      <h3>
                        {pkg.title}
                      </h3>


                      <div className="package-price">
                        {pkg.price}
                        <span>
                          / person
                        </span>
                      </div>


                      <div className="package-meta">

                        <span>
                          <Clock3 size={12} />
                          {pkg.duration}
                        </span>

                        <span>
                          <Handshake size={12} />
                          {pkg.vendorPartner}
                        </span>

                      </div>


                      <p>
                        {pkg.includes}
                      </p>


                      <button
                        type="button"
                        className={
                          isAssigned
                            ? "assigned-button"
                            : "recommend-button"
                        }
                        disabled={isAssigned}
                        onClick={() =>
                          assignPackageToGuest(
                            pkg.title
                          )
                        }
                      >

                        {isAssigned ? (
                          <>
                            <CheckCircle2 size={14} />
                            Assigned to Guest
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Recommend to Guest
                          </>
                        )}

                      </button>

                    </div>

                  </article>

                );
              })}

            </div>

          </section>


          {/* =================================================
              CREATE EXPERIENCE
          ================================================= */}

          <section className="create-package">

            <div className="create-header">

              <div className="create-icon">
                <Plus size={21} />
              </div>

              <div>

                <h2>
                  Create Local Experience
                </h2>

                <p>
                  Partner with local artisans, guides and
                  restaurants to create a new package.
                </p>

              </div>

            </div>


            <form
              onSubmit={handleCreatePackage}
              className="package-form"
            >

              {/* Package Title */}

              <div className="form-group">

                <label>
                  Package Title
                </label>

                <input
                  type="text"
                  placeholder="Vintage Auto & Royal Palace Tour"
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(e.target.value)
                  }
                />

              </div>


              {/* Price */}

              <div className="form-group">

                <label>
                  Price / Person
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="1499"
                  value={newPrice}
                  onChange={(e) =>
                    setNewPrice(e.target.value)
                  }
                />

              </div>


              {/* Duration */}

              <div className="form-group">

                <label>
                  Duration
                </label>

                <input
                  type="text"
                  placeholder="4 Hours"
                  value={newDuration}
                  onChange={(e) =>
                    setNewDuration(e.target.value)
                  }
                />

              </div>


              {/* Partner */}

              <div className="form-group">

                <label>
                  Local Partner
                </label>

                <input
                  type="text"
                  placeholder="Mewari Auto Union"
                  value={newPartner}
                  onChange={(e) =>
                    setNewPartner(e.target.value)
                  }
                />

              </div>


              {/* Includes */}

              <div className="form-group full">

                <label>
                  What's Included
                </label>

                <input
                  type="text"
                  placeholder="Hotel pickup + Palace ticket + Traditional lunch"
                  value={newIncludes}
                  onChange={(e) =>
                    setNewIncludes(e.target.value)
                  }
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="publish-button"
              >
                <Sparkles size={15} />
                Save & Publish Experience
              </button>

            </form>

          </section>

        </main>

      </div>

    </div>
  );
}
