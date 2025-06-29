import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserProfile } from "../api/profile/fetchProfile";
import { updateAvatar } from "../api/profile/updateAvatar";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, login } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar?.url || "");
  const [avatarMessage, setAvatarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.name || !user?.accessToken) return;

    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(user.name);
        setProfileData(data);
        setVenues(data.venues || []);
        setBookings(data.bookings || []);
      } catch (err) {
        setError("Failed to load profile data.");
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    setAvatarMessage("");

    try {
      await updateAvatar(user.name, avatarUrl, user.name);

      const updatedUser = {
        ...user,
        avatar: {
          url: avatarUrl,
          alt: user.name,
        },
      };

      login(updatedUser);
      setAvatarMessage("Avatar updated successfully!");
    } catch (err) {
      setAvatarMessage("Failed to update avatar.");
      console.error(err);
    }
  };

  if (loading) return <div className="container mt-5">Loading profile...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="bg-light">
      <div className="container py-5">
        <div className="row g-5 mb-4">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm text-center p-4 m-0">
              <img
                src={user.avatar?.url || "https://via.placeholder.com/150"}
                alt={user.avatar?.alt || user.name}
                className="rounded-circle img-fluid shadow mb-3 mx-auto"
                style={{ width: "140px", height: "140px", objectFit: "cover" }}
              />
              <h4 className="mb-1">{user.name}</h4>
              <p className="text-muted small mb-2">{user.email}</p>
              <span className={`badge mb-3 ${profileData?.venueManager ? "bg-success" : "bg-primary"}`}>
                {profileData?.venueManager ? "Venue Manager" : "Customer"}
              </span>

              <form onSubmit={handleAvatarUpdate} className="text-start">
                <label htmlFor="avatarUrl" className="form-label fw-bold">Change Avatar URL</label>
                <input
                  type="url"
                  id="avatarUrl"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="form-control mb-2"
                  placeholder="https://..."
                />
                <button type="submit" className="btn btn-primary w-100 btn-sm">Update Avatar</button>
                {avatarMessage && <div className="mt-2 text-info small text-center">{avatarMessage}</div>}
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h4 className="mb-3">Your Venues</h4>
            {venues.length === 0 ? (
              <p className="text-muted">You have not created any venues yet.</p>
            ) : (
              <div className="row row-cols-1 g-3">
                {venues.map((venue) => (
                  <div className="col" key={venue.id}>
                    <div className="card shadow-sm h-100 m-0" style={{ minWidth: 0 }}>
                      {venue.media?.[0]?.url && (
                        <img
                          src={venue.media[0].url}
                          alt={venue.name}
                          className="card-img-top"
                          style={{ height: "160px", objectFit: "cover" }}
                        />
                      )}
                      <div className="card-body">
                        <h5
                          className="card-title text-truncate d-block w-100"
                          title={venue.name}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {venue.name}
                        </h5>
                        <p className="card-text small text-muted">
                          {venue.description?.length > 80
                            ? `${venue.description.slice(0, 80)}...`
                            : venue.description}
                        </p>
                        <Link to={`/venue/${venue.id}`} className="btn btn-sm btn-outline-secondary">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <section className="mt-5">
              <h4 className="mb-3">Your Upcoming Bookings</h4>
              {bookings.length === 0 ? (
                <p className="text-muted">You have no upcoming bookings.</p>
              ) : (
                <div
                  className="list-group border rounded shadow-sm overflow-auto"
                  style={{ maxHeight: "400px" }}
                >
                  {bookings.map((booking) => (
                    <div
                      className="list-group-item py-3 px-4"
                      key={booking.id}
                    >
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                        <div className="small">
                          <div><strong>Venue:</strong> {booking.venue?.name || "Unknown"}</div>
                          <div>
                            <strong>Date:</strong>{" "}
                            {new Date(booking.dateFrom).toLocaleDateString()} →{" "}
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </div>
                          <div><strong>Guests:</strong> {booking.guests}</div>
                        </div>
                        <Link
                          to={`/venue/${booking.venue?.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          View Venue
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
