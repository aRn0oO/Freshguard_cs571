import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { InventoryProvider } from "./context/InventoryContext";
import BackupPage from "./pages/BackupPage";
import CalendarPage from "./pages/CalendarPage";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";

function routerBasename() {
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? base.slice(0, -1) || "/" : base;
}

export default function App() {
  return (
    <InventoryProvider>
      <BrowserRouter basename={routerBasename()}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="calendar" element={<CalendarPage />} />
          <Route path="backup" element={<BackupPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}
