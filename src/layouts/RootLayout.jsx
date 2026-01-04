import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shaerd/Footer/Footer";
import Navbar from "../pages/Shaerd/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="min-h-[calc(100vh-334px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
