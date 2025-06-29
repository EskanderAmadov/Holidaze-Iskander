import api from "../client";

export const createBooking = async (bookingData) => {
  try {
    const res = await api.post("/holidaze/bookings", bookingData);
    return res.data.data;
  } catch (error) {
    console.error("Failed to create booking:", error);
    throw new Error("Could not create booking.");
  }
};
