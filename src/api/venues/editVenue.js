import api from "../client";

export const editVenue = async (id, venueData) => {
  try {
    const res = await api.put(`/holidaze/venues/${id}`, venueData);
    return res.data.data;
  } catch (error) {
    console.error("Failed to update venue:", error);
    throw new Error("Could not update venue.");
  }
};
