import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { stats } from "../data/sampleData";
import StatCard from "../components/StatCard";

export default function HomePage() {
  return (
    <>
      <Row className="g-3 mb-3">
        <Col xs={12}>
          <Card className="section border shadow-sm">
            <Card.Body>
              <Card.Title as="h2">Dashboard</Card.Title>
              <div className="stats">
                {stats.map((stat) => (
                  <StatCard key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={12}>
          <Card className="section border shadow-sm">
            <Card.Body>
              <Card.Title as="h2">Mock scan module</Card.Title>
              <div className="mock-box">
                <div className="camera-box">
                  Image Upload
                  <br />
                  Coming Soon
                </div>
              </div>
              <div className="mock-result empty">No result yet.</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
