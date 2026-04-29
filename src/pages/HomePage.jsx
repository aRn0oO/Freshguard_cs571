import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import ItemCard from "../components/ItemCard";
import { useInventory } from "../context/InventoryContext";
import StatCard from "../components/StatCard";

export default function HomePage() {
  const { items } = useInventory();
  const urgent = items.filter((item) => item.status !== "Fresh");
  const totalCount = items.length;
  const expiringSoonCount = items.filter((item) => item.status === "Use Soon").length;
  const expiredCount = items.filter((item) => item.status === "Expired").length;

  const snapshotStats = [
    { label: "Total", value: totalCount },
    { label: "Expiring in 3 days", value: expiringSoonCount },
    { label: "Expired", value: expiredCount },
  ];

  return (
    <>
      <Row className="g-3 mb-3">
        <Col xs={12}>
          <Card className="section border shadow-sm">
            <Card.Body>
              <Card.Title as="h2">Items to use soon</Card.Title>
              <p className="visually-hidden" aria-live="polite">
                {urgent.length} urgent item{urgent.length === 1 ? "" : "s"}.
              </p>
              <div className="inventory-list">
                {urgent.length === 0 ? (
                  <p className="text-muted mb-0">Nothing urgent right now.</p>
                ) : (
                  urgent.map((item) => <ItemCard key={`home-urgent-${item.id}`} item={item} />)
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
              <div className="stats">
                {snapshotStats.map((stat) => (
                  <StatCard key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
