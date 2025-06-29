import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container-fluid p-0 bg-beige-light" >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
