import React, { useEffect, useState } from "react";
import VenueCard from "./VenueCard";
import { fetchVenues } from "../api/venues/fetchVenues";

const HomeVenuesPreview = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const latestVenues = await fetchVenues([], 6, 1); 
        setVenues(latestVenues);
      } catch (err) {
        setError("Failed to load venues.");
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5" id="venues">
      <div className="text-center mb-4">
        <h2 className="fw-bold display-5 py-5">Discover our selected places</h2>
      </div>

      <div className="row g-4 justify-content-center">
        {venues.map((venue) => (
          <div className="col-12 col-sm-6 col-lg-4" key={venue.id}>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>

      <div className="text-center mt-5 py-5">
        <a href="/venues" className="btn btn-dark btn-lg px-4">
          Browse more
        </a>
      </div>
    </div>
  );
};

export default HomeVenuesPreview;
