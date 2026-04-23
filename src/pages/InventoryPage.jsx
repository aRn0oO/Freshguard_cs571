import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import AddItemForm from "../components/AddItemForm";
import ItemCard from "../components/ItemCard";
import { starterInventory } from "../data/sampleData";

export default function InventoryPage() {
  const [items, setItems] = useState(starterInventory);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const shown = query
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      )
    : items;

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const urgent = items.filter((item) => item.status !== "Fresh");

  return (
    <>
      <Row className="g-3 mb-3">
        <Col xs={12}>
          <Card className="section border shadow-sm">
            <Card.Body>
              <Card.Title as="h2">Add item</Card.Title>
              <AddItemForm
                onAdd={(item) => {
                  setItems((prev) => [...prev, item]);
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col xs={12}>
          <Card className="section border shadow-sm">
            <Card.Body>
              <div className="inventory-header">
                <Card.Title as="h2" className="mb-0">
                  Inventory
                </Card.Title>
                <Form.Control
                  type="search"
                  placeholder="Search by name or location"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="inventory-search"
                />
              </div>
              <div className="inventory-list">
                {shown.length === 0 ? (
                  <p className="text-muted mb-0">No items match.</p>
                ) : (
                  shown.map((item) => (
                    <ItemCard key={item.id} item={item} onDelete={handleDelete} />
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={12}>
          <Card className="section border shadow-sm">
            <Card.Body>
              <Card.Title as="h2">Items to use soon</Card.Title>
              <div className="inventory-list">
                {urgent.length === 0 ? (
                  <p className="text-muted mb-0">Nothing urgent right now.</p>
                ) : (
                  urgent.map((item) => (
                    <ItemCard key={`urgent-${item.id}`} item={item} onDelete={handleDelete} />
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
