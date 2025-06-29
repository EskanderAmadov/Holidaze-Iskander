import api from "../client";

export const fetchVenues = async (include = []) => {
  try {
    const params = new URLSearchParams();
    if (include.includes("_bookings")) params.append("_bookings", "true");
    if (include.includes("_owner")) params.append("_owner", "true");

    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await api.get(`/holidaze/venues${query}`);

    const venues = res.data.data;

    return venues.sort((a, b) => new Date(b.created) - new Date(a.created));
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    throw new Error("Could not load venues.");
  }
};
