import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark py-5 text-light">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Column 1 */}
          <div className="col-md-4 mb-4">
            <h5>Holidaze</h5>
            <p className="small">
              Discover unique places to stay across Norway – for adventure, relaxation, and unforgettable memories.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h6>Navigation</h6>
            <ul className="list-unstyled footer-nav">
              <li>
                <NavLink to="/" className="footer-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/venues" className="footer-link">
                  Book now
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="footer-link">
                  About
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6>Contact</h6>
            <ul className="list-unstyled">
              <li><small>Email: support@holidazeoslo.no</small></li>
              <li><small>Phone: +47 123 45 678</small></li>
              <li><small>Address: Oslo city center, Norway</small></li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} Holidaze. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
