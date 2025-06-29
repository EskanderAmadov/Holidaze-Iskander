import api from "../client";

export const createVenue = async (venueData) => {
  try {
    const res = await api.post("/holidaze/venues", venueData);
    return res.data.data;
  } catch (error) {
    console.error("Failed to create venue:", error);
    throw new Error("Could not create venue.");
  }
};