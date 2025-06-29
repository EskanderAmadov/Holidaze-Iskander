import React from "react";
import { Link } from "react-router-dom";

const VenueCard = ({ venue }) => {
  const {
    id,
    name,
    location,
    media,
    price,
  } = venue;

  const hasImage = Array.isArray(media) && media.length > 0 && media[0].url;
  const imageUrl = hasImage
    ? media[0].url
    : "https://via.placeholder.com/400x300?text=No+Image";
  const imageAlt = hasImage
    ? media[0].alt || name
    : "No image available";

  return (
    <Link to={`/venue/${id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          {location?.city && (
            <p className="card-text">
              <strong>City:</strong> {location.city}
            </p>
          )}
          {price && (
            <p className="card-text">
              <strong>Price:</strong> ${price} / night
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
