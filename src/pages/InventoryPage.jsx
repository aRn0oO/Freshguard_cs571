import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import AddItemForm from "../components/AddItemForm";
import ItemCard from "../components/ItemCard";
import { useInventory } from "../context/InventoryContext";

export default function InventoryPage() {
  const { items, addItem, deleteItem, moveItemLocation } = useInventory();
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
    deleteItem(id);
  }

  function handleMoveLocation(id, location) {
    moveItemLocation(id, location);
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
                  addItem(item);
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
              <Card.Title as="h2">Items to use soon</Card.Title>
              <div className="inventory-list">
                {urgent.length === 0 ? (
                  <p className="text-muted mb-0">Nothing urgent right now.</p>
                ) : (
                  urgent.map((item) => (
                    <ItemCard
                      key={`urgent-${item.id}`}
                      item={item}
                      onDelete={handleDelete}
                      onMove={handleMoveLocation}
                    />
                  ))
                )}
              </div>
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
                <Form.Label htmlFor="inventory-search" className="visually-hidden">
                  Search inventory by name or location
                </Form.Label>
                <Form.Control
                  id="inventory-search"
                  type="search"
                  placeholder="Search by name or location"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="inventory-search"
                />
              </div>
              <p className="visually-hidden" aria-live="polite">
                Showing {shown.length} inventory item{shown.length === 1 ? "" : "s"}.
              </p>
              <div className="inventory-list">
                {shown.length === 0 ? (
                  <p className="text-muted mb-0">No items match.</p>
                ) : (
                  shown.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onDelete={handleDelete}
                      onMove={handleMoveLocation}
                    />
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
