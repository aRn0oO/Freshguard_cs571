import React, { useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";

function statusVariant(status) {
  if (status === "Fresh") return "success";
  if (status === "Expired") return "danger";
  return "warning";
}

const LOCATION_OPTIONS = ["Fridge", "Freezer", "Pantry"];

export default function ItemCard({ item, onDelete, onMove }) {
  const [nextLocation, setNextLocation] = useState(item.location);

  useEffect(() => {
    setNextLocation(item.location);
  }, [item.location]);

  return (
    <article className="item">
      <div>
        <h3>{item.name}</h3>
        <p>Location: {item.location}</p>
        <p>Expiry: {item.expiry}</p>
        <Badge bg={statusVariant(item.status)} className="mt-2">
          {item.status}
        </Badge>
      </div>
      <div className="item-actions">
        {onMove ? (
          <div className="item-move">
            <Form.Select
              size="sm"
              value={nextLocation}
              onChange={(e) => setNextLocation(e.target.value)}
              aria-label={`Move ${item.name} location`}
            >
              {LOCATION_OPTIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onMove(item.id, nextLocation)}
              disabled={nextLocation === item.location}
            >
              Move
            </Button>
          </div>
        ) : null}
        {onDelete ? (
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(item.id)}>
            Delete
          </Button>
        ) : null}
      </div>
    </article>
  );
}
