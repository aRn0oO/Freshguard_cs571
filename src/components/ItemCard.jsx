import React from "react";
import { Badge, Button } from "react-bootstrap";

function statusVariant(status) {
  if (status === "Fresh") return "success";
  if (status === "Expired") return "danger";
  return "warning";
}

export default function ItemCard({ item, onDelete }) {
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
      {onDelete ? (
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
      ) : null}
    </article>
  );
}
