import api from "../client";

export const deleteVenue = async (id) => {
  try {
    const res = await api.delete(`/holidaze/venues/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Failed to delete venue:", error);
    throw new Error("Could not delete venue.");
  }
};
