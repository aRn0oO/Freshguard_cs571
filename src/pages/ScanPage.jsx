import React from "react";
import { Col, Row } from "react-bootstrap";
import ScanModule from "../components/ScanModule";

export default function ScanPage() {
  return (
    <Row className="g-3">
      <Col xs={12}>
        <ScanModule />
      </Col>
    </Row>
  );
}
