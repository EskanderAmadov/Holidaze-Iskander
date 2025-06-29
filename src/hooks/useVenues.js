import { useEffect, useState } from "react";
import { getVenues } from "../services/venues";

const useVenues = (include = []) => {
  const [venues, setVenues] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues(include);
        setVenues(data);
        setFiltered(data);
      } catch (err) {
        console.error("useVenues error:", err);
        setError("Failed to fetch venues: " + (err.message || ""));
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [include]);

  const filterVenues = (search) => {
    const query = search.toLowerCase();
    const results = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query)
    );
    setFiltered(results);
  };

  return {
    venues,       
    filtered,      
    loading,
    error,
    filterVenues,
  };
};

export default useVenues;
