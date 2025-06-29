import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      {/* Top admin bar */}
      <div className="container bg-light border-bottom shadow-sm py-3 mt-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <h2 className="fw-bold m-0">Admin Dashboard</h2>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <Link to="/admin" className="btn btn-outline-primary btn-sm">
                My Venues
              </Link>
              <Link to="/venue/create" className="btn btn-primary btn-sm">
                Create New Venue
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="container py-4">{children}</div>
      <Footer />
    </>
  );
};

export default AdminLayout;
