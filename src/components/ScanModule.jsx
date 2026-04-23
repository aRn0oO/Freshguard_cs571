import React, { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { scanFoodImage } from "../services/geminiScan";

export default function ScanModule() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onFileChange(e) {
    const f = e.target.files[0];
    setError("");
    setResult(null);
    setFile(f || null);
    if (!f) {
      setPreviewUrl("");
      return;
    }
    setPreviewUrl(URL.createObjectURL(f));
  }

  async function onScan() {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const data = await scanFoodImage(file);
      setResult(data);
    } catch (err) {
      setError(err.message || "Scan failed");
    }
    setLoading(false);
  }

  return (
    <Card className="section border shadow-sm">
      <Card.Body>
        <Card.Title as="h2">Scan food photo</Card.Title>
        <Form.Group className="mb-3">
          <Form.Label>Image file</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={onFileChange} />
        </Form.Group>

        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="scan-preview-image mb-3" />
        ) : null}

        <Button onClick={onScan} disabled={!file || loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Scanning…
            </>
          ) : (
            "Scan"
          )}
        </Button>

        {error ? (
          <Alert variant="danger" className="mt-3 mb-0">
            {error}
          </Alert>
        ) : null}

        <div className="mock-result mt-3">
          {!result ? (
            <span className="empty">No result yet.</span>
          ) : (
            <ul className="mb-0 ps-3">
              <li>
                <strong>Item:</strong> {result.itemName}
              </li>
              <li>
                <strong>Category:</strong> {result.category}
              </li>
              <li>
                <strong>Location:</strong> {result.location}
              </li>
              <li>
                <strong>Status:</strong> {result.status}
              </li>
              <li>
                <strong>Confidence:</strong> {Math.round(result.confidence * 100)}%
              </li>
              <li>
                <strong>Notes:</strong> {result.notes}
              </li>
            </ul>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
