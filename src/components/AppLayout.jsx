import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

export default function AppLayout() {
  return (
    <>
      <AppNavbar />
      <div className="page">
        <Outlet />
      </div>
    </>
  );
}
