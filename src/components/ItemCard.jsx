import React from "react";
import { Badge } from "react-bootstrap";

function statusVariant(status) {
  if (status === "Fresh") return "success";
  if (status === "Expired") return "danger";
  return "warning";
}

export default function ItemCard({ item }) {
  return (
    <article className="item">
      <div>
        <h3>{item.name}</h3>
        <p>Category: {item.category}</p>
        <p>Location: {item.location}</p>
        <p>Expiry: {item.expiry}</p>
        <Badge bg={statusVariant(item.status)} className="mt-2">
          {item.status}
        </Badge>
      </div>
    </article>
  );
}
