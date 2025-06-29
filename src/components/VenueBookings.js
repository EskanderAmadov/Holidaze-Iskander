import React, { useEffect, useState } from "react";
import api from "../api/client";

const VenueBookings = ({ venueId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/holidaze/venues/${venueId}?_bookings=true`);
        const fetchedBookings = res.data?.data?.bookings ?? [];
        setBookings(fetchedBookings);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [venueId]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!Array.isArray(bookings) || bookings.length === 0) return <p>No bookings yet.</p>;

  return (
    <div className="mt-3">
      <h5>Bookings</h5>
      <ul className="list-group d-flex gap-3">
        {bookings.map((booking) => (
          <li key={booking.id} className="list-group-item">
            <strong>Guest:</strong> {booking.customer?.name || "Unknown"}<br />
            <strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}<br />
            <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}<br />
            <strong>Guests:</strong> {booking.guests}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueBookings;
