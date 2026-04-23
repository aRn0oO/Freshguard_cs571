import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import ScanPage from "./pages/ScanPage";

function routerBasename() {
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? base.slice(0, -1) || "/" : base;
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="scan" element={<ScanPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
