import api from "../client";

export const fetchUserProfile = async (name) => {
  try {
    const res = await api.get(`/holidaze/profiles/${name}?_bookings=true&_venues=true`);
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};