import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useInventory } from "../context/InventoryContext";

const REQUIRED_FIELDS = ["id", "name", "category", "location", "expiry", "status"];

function isValidBackupItem(item) {
  if (!item || typeof item !== "object") return false;
  return REQUIRED_FIELDS.every((field) => field in item);
}

export default function BackupPage() {
  const { items, replaceItems } = useInventory();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleExportJson() {
    const backup = {
      exportedAt: new Date().toISOString(),
      version: 1,
      items,
    };
    const file = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "freshguard-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    setError("");
    setMessage("Backup downloaded.");
  }

  async function handleImportJson(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const importedItems = Array.isArray(parsed) ? parsed : parsed.items;

      if (!Array.isArray(importedItems)) {
        throw new Error("Invalid backup format: missing items array.");
      }
      if (!importedItems.every(isValidBackupItem)) {
        throw new Error("Invalid backup format: one or more items are malformed.");
      }

      replaceItems(importedItems);
      setError("");
      setMessage(`Imported ${importedItems.length} item(s).`);
    } catch (error) {
      setMessage("");
      setError(error.message || "Could not import backup file.");
    } finally {
      e.target.value = "";
    }
  }

  return (
    <Card className="section border shadow-sm">
      <Card.Body>
        <Card.Title as="h2">Backup</Card.Title>
        <p className="text-muted mb-3">Export inventory as JSON or import a previous backup.</p>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Button variant="outline-secondary" onClick={handleExportJson}>
            Export JSON
          </Button>
          <Form.Group controlId="import-backup-json" className="mb-0">
            <Form.Label className="btn btn-outline-secondary mb-0">Import JSON</Form.Label>
            <Form.Control
              type="file"
              accept="application/json,.json"
              onChange={handleImportJson}
              className="visually-hidden"
            />
          </Form.Group>
        </div>
        {message ? (
          <Alert variant="success" className="mt-3 mb-0" role="status">
            {message}
          </Alert>
        ) : null}
        {error ? (
          <Alert variant="danger" className="mt-3 mb-0">
            {error}
          </Alert>
        ) : null}
      </Card.Body>
    </Card>
  );
}
