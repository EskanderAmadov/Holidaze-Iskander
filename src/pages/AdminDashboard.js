import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/client";
import VenueBookings from "../components/VenueBookings";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get(`/holidaze/profiles/${user.name}/venues`);
        setVenues(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch your venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [user.name]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmed) return;

    try {
      await api.delete(`/holidaze/venues/${id}`);
      setVenues((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert("Failed to delete venue.");
      console.error("Delete error:", err);
    }
  };

  if (loading) return <div className="container mt-5">Loading your venues...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="bg-light p-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold mb-1">Your Dashboard</h2>
            <p className="text-muted mb-0">Welcome, {user.name}. Here you can manage your venues.</p>
          </div>
        </div>

        {venues.length === 0 ? (
          <p className="text-muted">You haven’t created any venues yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {venues.map((venue) => (
              <div className="col" key={venue.id}>
                <div className="card shadow-sm border-0 rounded-4 h-100 bg-white m-0">
                  {venue.media?.[0]?.url && (
                    <img
                      src={venue.media[0].url}
                      alt={venue.name}
                      className="card-img-top rounded-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={venue.name}>
                      {venue.name}
                    </h5>
                    <div className="d-flex flex-column flex-sm-row gap-2 my-3">
                      <Link to={`/venue/${venue.id}`} className="btn btn-outline-primary btn-sm w-100">
                        <Eye size={16} className="me-1" />
                        View
                      </Link>
                      <Link to={`/venue/edit/${venue.id}`} className="btn btn-outline-secondary btn-sm w-100">
                        <Edit size={16} className="me-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(venue.id)}
                        className="btn btn-outline-danger btn-sm w-100"
                      >
                        <Trash2 size={16} className="me-1" />
                        Delete
                      </button>
                    </div>

                    <VenueBookings venueId={venue.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
