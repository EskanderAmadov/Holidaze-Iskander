import React from "react";

const About = () => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-stretch" style={{ minHeight: "70vh" }}>
        <div className="w-100 w-md-50 d-flex flex-column justify-content-center  p-5 p-md-4 bg-blue-light">
          <h1 className="mb-4">About Holidaze Oslo</h1>
          <p>
            Holidaze Oslo is a modern platform for booking unique places to stay all over Norway. 
            We started with a simple goal: to make real and authentic travel experiences available to 
            everyone – from city apartments to remote mountain cabins.
          </p>
          <p>
            We connect hosts and guests in a safe and personal way. With a strong focus on local experiences and 
            sustainability, we want to be part of your next unforgettable trip.
          </p>
          <p>
            Whether you travel to explore, work, relax, or just enjoy the moment – Holidaze Oslo makes it easy to find your perfect place.
          </p>
        </div>
        <div
          className="w-100 w-md-50"
          style={{
            backgroundImage: "url('./assets/oslo-by.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "300px",
          }}
        ></div>
      </div>
      <div className="container py-5 d-flex flex-column justify-content-center p-5 p-md-4 "style={{ minHeight: "50vh" }}>
        <h2 className="text-center mb-4">What We Believe In</h2>
        <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          At Holidaze Oslo, we believe in real travel experiences – not just destinations. 
          We want to build connections between people and places, support local communities, and 
          inspire responsible tourism. Every booking is an invitation to experience Norway as it truly is: personal, scenic, and memorable.
        </p>
      </div>
    </>
  );
};

export default About;
