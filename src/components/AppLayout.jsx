import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

export default function AppLayout() {
  return (
    <>
      <AppNavbar />
      <main id="main-content" className="page" tabIndex="-1">
        <Outlet />
      </main>
    </>
  );
}
