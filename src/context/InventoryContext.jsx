import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "freshguard.inventory.items";
const InventoryContext = createContext(null);
const DEFAULT_ITEMS = [
  {
    id: 1,
    name: "Greek yogurt",
    category: "Dairy",
    location: "Fridge",
    expiry: "2026-04-28",
    status: "Use Soon",
  },
  {
    id: 2,
    name: "Spinach",
    category: "Produce",
    location: "Fridge",
    expiry: "2026-04-24",
    status: "Fresh",
  },
];

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ITEMS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ITEMS;
  } catch {
    return DEFAULT_ITEMS;
  }
}

export function InventoryProvider({ children }) {
  const [items, setItems] = useState(loadInitialItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    setItems((prev) => [...prev, item]);
  }

  function replaceItems(nextItems) {
    setItems(nextItems);
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function moveItemLocation(id, location) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, location } : item)));
  }

  return (
    <InventoryContext.Provider
      value={{ items, addItem, replaceItems, deleteItem, moveItemLocation }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const value = useContext(InventoryContext);
  if (!value) {
    throw new Error("useInventory must be used within InventoryProvider");
  }
  return value;
}
