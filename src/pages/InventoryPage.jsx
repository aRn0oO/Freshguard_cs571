import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { inventory } from "../data/sampleData";
import ItemCard from "../components/ItemCard";

export default function InventoryPage() {
  const urgent = inventory.filter((item) => item.status !== "Fresh");

  return (
    <>
      <Row className="g-3 mb-3">
        <Col xs={12}>
          <Card className="section border shadow-sm">
            <Card.Body>
              <Card.Title as="h2">Add item (preview only)</Card.Title>
              <Row className="g-3">
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label>Item name</Form.Label>
                    <Form.Control type="text" placeholder="ex. Yogurt" disabled />
                  </Form.Group>
                </Col>
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select disabled defaultValue="Produce">
                      <option>Produce</option>
                      <option>Dairy</option>
                      <option>Meat</option>
                      <option>Drink</option>
                      <option>Leftovers</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label>Expiry date</Form.Label>
                    <Form.Control type="date" disabled />
                  </Form.Group>
                </Col>
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Select disabled defaultValue="Fridge">
                      <option>Fridge</option>
                      <option>Freezer</option>
                      <option>Pantry</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
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
                  placeholder="Search (static view)"
                  disabled
                  className="inventory-search"
                />
              </div>
              <div className="inventory-list">
                {inventory.length === 0 ? (
                  <p className="text-muted mb-0">No items yet.</p>
                ) : (
                  inventory.map((item) => <ItemCard key={item.id} item={item} />)
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
                  urgent.map((item) => <ItemCard key={`urgent-${item.id}`} item={item} />)
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
