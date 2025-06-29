// src/api/bookings/fetchVenueBookings.js
import api from "../client";

export const fetchVenueBookings = async (venueId) => {
  try {
    const res = await api.get(`/holidaze/venues/${venueId}?_bookings=true`);
    return res.data.data.bookings || [];
  } catch (error) {
    console.error("Failed to fetch venue bookings:", error);
    throw new Error("Could not fetch venue bookings.");
  }
};
