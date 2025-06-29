import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaHotel, FaBed, FaHome } from "react-icons/fa";
import api from "../api/client";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get("/holidaze/venues");
        const filtered = res.data.data.filter((venue) =>
          venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } catch (err) {
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="home-banner position-relative text-white d-flex align-items-center justify-content-center text-center">
      <div className="position-absolute top-0 start-0 w-100 h-100 overlay-dark"></div>
      <div className="position-relative z-2 w-100 px-3 mx-auto" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold mb-4 fs-3 fs-md-2 fs-lg-1">
          Find your next getaway with Holidaze.
        </h1>
        <div className="w-100 w-md-75 w-lg-50 mx-auto">
          <div className="position-relative">
            <div className="input-group input-group-lg mb-3 shadow-sm rounded overflow-hidden">
              <input
                type="text"
                className="form-control"
                placeholder="Search for venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text bg-orange-light-100">
                <BiSearch className="text-white" />
              </span>
            </div>

            {suggestions.length > 0 && (
              <ul className="list-group text-start shadow-sm suggestions-dropdown">
                {suggestions.map((venue) => (
                  <li key={venue.id} className="list-group-item list-group-item-action">
                    <Link to={`/venue/${venue.id}`} className="text-decoration-none text-dark d-block">
                      {venue.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="d-none d-md-flex justify-content-start gap-4 mt-2 flex-wrap text-white medium category-row">
          <div className="d-flex gap-3 align-items-center">
            <FaHotel size={28} className="mb-1" />
            <span>Hotel</span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <FaHome size={28} className="mb-1" />
            <span>Guesthouse</span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <FaBed size={28} className="mb-1" />
            <span>Bed & Breakfast</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
