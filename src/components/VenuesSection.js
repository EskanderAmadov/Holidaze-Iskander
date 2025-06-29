import React, { useState, useEffect } from "react";
import VenueCard from "./VenueCard";
import { fetchVenues } from "../api/fetchVenues";

const VenuesSection = ({ limit }) => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 12;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const data = await fetchVenues([], 100); 
        setVenues(data);
        setFilteredVenues(data);
      } catch (err) {
        setError("Failed to load venues");
      } finally {
        setLoading(false);
      }
    };
    loadVenues();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(lowerSearch) ||
      venue.location?.city?.toLowerCase().includes(lowerSearch)
    );
    setFilteredVenues(filtered);
    setCurrentPage(1);
  }, [searchTerm, venues]);

  const indexOfLast = currentPage * venuesPerPage;
  const indexOfFirst = indexOfLast - venuesPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const venuesToDisplay = limit ? filteredVenues.slice(0, limit) : currentVenues;
  const sectionTitle = limit ? "Discover our selected places" : "Available accommodations";

  if (loading) return <div className="container mt-5">Loading venues...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container-fluid py-5" id="venues">
      <div className={`mb-4 ${limit ? "text-center" : ""}`}>
        <h2 className="fw-bold display-5 py-5">{sectionTitle}</h2>
      </div>

      {!limit && (
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="container-fluid">
        <div className="row g-4">
          {venuesToDisplay.length > 0 ? (
            venuesToDisplay.map((venue) => (
              <div className="col-12 col-sm-6 col-lg-4" key={venue.id}>
                <VenueCard venue={venue} />
              </div>
            ))
          ) : (
            <p>No venues found.</p>
          )}
        </div>
      </div>

      {!limit && totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <button onClick={prevPage} disabled={currentPage === 1} className="btn btn-outline-primary">
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="btn btn-outline-primary">
            Next
          </button>
        </div>
      )}

      {limit && (
        <div className="text-center mt-5 py-4">
          <a href="/venues" className="btn btn-dark">
            Show all
          </a>
        </div>
      )}
    </div>
  );
};

export default VenuesSection;
