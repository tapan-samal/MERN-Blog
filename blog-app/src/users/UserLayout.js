import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
