import React, { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import { fetchVenues } from "../api/venues/fetchVenues";

const VenuesPage = () => {
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
        const data = await fetchVenues();
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
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVenues(filtered);
    setCurrentPage(1);
  }, [searchTerm, venues]);

  const indexOfLast = currentPage * venuesPerPage;
  const indexOfFirst = indexOfLast - venuesPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);

  if (loading) return <div className="container py-5">Loading venues...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container-fluid bg-gray-light">
      <div className="container py-5">
        <h2 className="fw-bold display-5 mb-4 text-center py-5">All Accommodations</h2>

        <div className="mb-5 d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-100 w-md-50 shadow-sm rounded-pill px-4 py-2"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row g-4">
          {currentVenues.length > 0 ? (
            currentVenues.map((venue) => (
              <div className="col-12 col-sm-6 col-lg-4" key={venue.id}>
                <div className="h-100 rounded p-2">
                  <VenueCard venue={venue} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No venues found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-5 flex-wrap">
            <button
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ← <span className="d-none d-sm-inline">Previous</span>
            </button>

            <span className="fw-semibold small">
              <span className="d-inline d-sm-none">{currentPage} / {totalPages}</span>
              <span className="d-none d-sm-inline">Page {currentPage} of {totalPages}</span>
            </span>

            <button
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="d-none d-sm-inline">Next</span> →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuesPage;
