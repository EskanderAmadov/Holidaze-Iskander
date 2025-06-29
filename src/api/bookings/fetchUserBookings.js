import api from "../client";

export const fetchUserBookings = async (username) => {
  try {
    const res = await api.get(`/holidaze/profiles/${username}?_bookings=true`);
    return res.data.data.bookings || [];
  } catch (error) {
    console.error("Failed to fetch user bookings:", error);
    throw new Error("Could not fetch bookings.");
  }
};
