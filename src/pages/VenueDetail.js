import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import BookingForm from "../components/BookingForm";
import "react-datepicker/dist/react-datepicker.css";
import {
  Wifi,
  ParkingCircle,
  ParkingCircleOff,
  Utensils,
  Dog,
  Ban,
  Star,
  MapPin,
  Globe,
  Users,
  DollarSign,
} from "lucide-react";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await api.get(`/holidaze/venues/${id}?_bookings=true`);
        const data = res.data.data;
        setVenue(data);

        const dates =
          data.bookings?.flatMap((booking) => {
            const from = new Date(booking.dateFrom);
            const to = new Date(booking.dateTo);
            const range = [];
            for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
              range.push(new Date(d));
            }
            return range;
          }) || [];

        setBookedDates(dates);
      } catch (err) {
        setError("Failed to load venue details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;
  if (!venue) return null;

  const { name, description, media, location, price, maxGuests, rating, meta } = venue;
  const validMedia = Array.isArray(media) ? media.filter((img) => img.url) : [];

  return (
    <div className="bg-white">
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-lg-7">
            <h2 className="mb-3">{name}</h2>

            {validMedia.length > 0 && (
              <div className="mb-4 rounded shadow-sm overflow-hidden">
                <img
                  src={validMedia[0].url}
                  alt={validMedia[0].alt || name}
                  className="img-fluid w-100 rounded"
                  style={{ objectFit: "cover", height: "350px" }}
                />
              </div>
            )}

            <p className="text-muted">{description}</p>

            <div className="row mb-3">
              <div className="col-sm-6 d-flex align-items-center mb-2">
                <MapPin className="me-2" size={18} />
                <strong>City:</strong>&nbsp;{location?.city}
              </div>
              <div className="col-sm-6 d-flex align-items-center mb-2">
                <Globe className="me-2" size={18} />
                <strong>Country:</strong>&nbsp;{location?.country}
              </div>
              <div className="col-sm-6 d-flex align-items-center mb-2">
                <DollarSign className="me-2" size={18} />
                <strong>Price:</strong>&nbsp;${price} / night
              </div>
              <div className="col-sm-6 d-flex align-items-center mb-2">
                <Users className="me-2" size={18} />
                <strong>Max Guests:</strong>&nbsp;{maxGuests}
              </div>
              <div className="col-sm-6 d-flex align-items-center mb-2">
                <Star className="me-2" size={18} />
                <strong>Rating:</strong>&nbsp;{rating} ★
              </div>
            </div>

            <div className="mb-4">
              <h5>Facilities</h5>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  {meta.wifi ? <Wifi className="me-2" /> : <Ban className="me-2" />}
                  <span>{meta.wifi ? "Wifi available" : "No Wifi"}</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  {meta.parking ? <ParkingCircle className="me-2" /> : <ParkingCircleOff className="me-2" />}
                  <span>{meta.parking ? "Parking available" : "No Parking"}</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  {meta.breakfast ? <Utensils className="me-2" /> : <Ban className="me-2" />}
                  <span>{meta.breakfast ? "Breakfast included" : "No Breakfast"}</span>
                </li>
                <li className="d-flex align-items-center">
                  {meta.pets ? <Dog className="me-2" /> : <Ban className="me-2" />}
                  <span>{meta.pets ? "Pets allowed" : "No Pets"}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-5 d-flex align-items-start">
            <div className="border p-4 shadow-sm bg-light rounded w-100 mt-lg-0 mt-5 py-5">
              <h5 className="mb-3">Book this venue</h5>
              <BookingForm venueId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
