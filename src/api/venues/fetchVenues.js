import api from "../client";

export const fetchVenues = async (include = [], limit = 100, page = 1) => {
  try {
    const params = new URLSearchParams();
    if (include.includes("_bookings")) params.append("_bookings", "true");
    if (include.includes("_owner")) params.append("_owner", "true");
    params.append("sort", "created");
    params.append("sortOrder", "desc");
    params.append("limit", limit);
    params.append("page", page);

    const res = await api.get(`/holidaze/venues?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    throw new Error("Could not load venues.");
  }
};
