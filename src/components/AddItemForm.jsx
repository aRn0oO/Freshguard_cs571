import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

function statusFromExpiry(expiryStr) {
  if (!expiryStr) return "Fresh";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expiryStr + "T12:00:00");
  exp.setHours(0, 0, 0, 0);
  if (exp < today) return "Expired";
  const diffDays = (exp - today) / 86400000;
  if (diffDays <= 3) return "Use Soon";
  return "Fresh";
}

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [expiry, setExpiry] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;
    onAdd({
      id: Date.now(),
      name: name.trim(),
      category: "Other",
      location: location.trim(),
      expiry: expiry || "—",
      status: statusFromExpiry(expiry),
    });
    setName("");
    setLocation("");
    setExpiry("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3 align-items-end">
        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g. Greek yogurt"
              required
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="e.g. Fridge door"
              required
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={2}>
          <Form.Group>
            <Form.Label>Expiration day</Form.Label>
            <Form.Control type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          </Form.Group>
        </Col>
        <Col xs={12} md={2} className="d-grid">
          <Button type="submit" variant="success">
            Add Item
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
