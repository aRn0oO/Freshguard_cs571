import React from "react";

const stats = [
  { label: "Fresh", value: 5 },
  { label: "Use Soon", value: 2 },
  { label: "Expired", value: 1 },
];

const inventory = [
  {
    id: 1,
    name: "Milk",
    category: "Dairy",
    location: "Fridge",
    expiry: "2026-03-22",
    status: "Fresh",
  },
  {
    id: 2,
    name: "Chicken",
    category: "Meat",
    location: "Fridge",
    expiry: "2026-03-20",
    status: "Use Soon",
  },
  {
    id: 3,
    name: "Spinach",
    category: "Produce",
    location: "Fridge",
    expiry: "2026-03-18",
    status: "Expired",
  },
];

function ItemCard({ item }) {
  const statusClass =
    item.status === "Fresh" ? "fresh" : item.status === "Expired" ? "expired" : "soon";

  return (
    <article className="item">
      <div>
        <h3>{item.name}</h3>
        <p>Category: {item.category}</p>
        <p>Location: {item.location}</p>
        <p>Expiry: {item.expiry}</p>
        <span className={`badge ${statusClass}`}>{item.status}</span>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <div>
          <h1>FreshGuard</h1>
        </div>
      </header>

      <main className="page">
        <section className="grid-2">
          <section className="section">
            <h2>Dashboard</h2>
            <div className="stats">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <h3>{stat.label}</h3>
                  <p>{stat.value}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <h2>Mock scan module</h2>
            <div className="mock-box">
              <div className="camera-box">
                Image Upload
                <br />
                Coming Soon
              </div>
            </div>
            <div className="mock-result empty">No result yet.</div>
          </section>
        </section>

        <section className="section">
          <h2>Add item (preview only)</h2>
          <div className="form">
            <label>
              Item name
              <input type="text" placeholder="ex. Yogurt" disabled />
            </label>
            <label>
              Category
              <select disabled>
                <option>Produce</option>
                <option>Dairy</option>
                <option>Meat</option>
                <option>Drink</option>
                <option>Leftovers</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Expiry date
              <input type="date" disabled />
            </label>
            <label>
              Location
              <select disabled>
                <option>Fridge</option>
                <option>Freezer</option>
                <option>Pantry</option>
              </select>
            </label>
          </div>
        </section>

        <section className="section">
          <div className="inventory-header">
            <h2>Inventory</h2>
            <input type="text" placeholder="Search (static view)" disabled />
          </div>
          <div className="inventory-list">
            {inventory.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Items to use soon</h2>
          <div className="inventory-list">
            {inventory
              .filter((item) => item.status !== "Fresh")
              .map((item) => (
                <ItemCard key={`urgent-${item.id}`} item={item} />
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
