import React from "react";
import HomeVenuesPreview from "../components/HomeVenuesPreview";
import HomeBanner from "../components/HomeBanner";
import HistorySection from "../components/HistorySection";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <HomeVenuesPreview limit={6} />
      <HistorySection />
    </>
  );
};

export default Home;
