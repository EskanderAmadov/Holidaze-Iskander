import React from "react";
import { Link } from "react-router-dom";

const HistorySection = () => {
  return (
    <div className="d-flex flex-column-reverse flex-md-row align-items-stretch text-black" style={{ minHeight: "auto" }}>
      <div className="p-5 bg-orange-light-100 d-flex flex-column justify-content-center w-100 w-md-50">
        <h1 className="mb-4 fw-bold">Our Story</h1>
        <p className="fs-5">
          Holidaze Oslo was founded with a vision to bring travelers closer to the authentic Norwegian experience.
          From idyllic cabins in the mountains to modern apartments in the heart of the city, we’ve made it our mission
          to make unique experiences accessible to everyone.
        </p>
        <p className="fs-5">
          We believe in sustainability, community, and lasting memories. Our platform connects local hosts with adventurous guests –
          safely, personally, and seamlessly.
        </p>
        <Link to="/about" className="btn btn-dark mt-3 align-self-start">
          Read more
        </Link>
      </div>

      <div
        className="w-100 w-md-50"
        style={{
          backgroundImage: "url('./assets/bergenHus.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "600px",
        }}
      ></div>
    </div>
  );
};

export default HistorySection;
