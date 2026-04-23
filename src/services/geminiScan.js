const MODEL = "gemini-2.0-flash";

/** Read file as base64 (part after the comma) for Gemini */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result);
      const comma = s.indexOf(",");
      resolve(comma === -1 ? s : s.slice(comma + 1));
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

/** Pull JSON object out of model text and fill in defaults */
function parseFoodJson(text) {
  if (!text) return null;
  let t = text.trim();
  if (!t.startsWith("{")) {
    const a = t.indexOf("{");
    const b = t.lastIndexOf("}");
    if (a === -1 || b === -1 || b <= a) return null;
    t = t.slice(a, b + 1);
  }
  let obj;
  try {
    obj = JSON.parse(t);
  } catch {
    return null;
  }
  return {
    itemName: String(obj.itemName || "Unknown"),
    category: String(obj.category || "Other"),
    location: String(obj.location || "Fridge"),
    status: String(obj.status || "Use Soon"),
    notes: String(obj.notes || ""),
    confidence: typeof obj.confidence === "number" ? obj.confidence : 0.5,
  };
}

export async function scanFoodImage(file) {
  const key = import.meta.env.VITE_GEMINI_API_KEY;

  if (!key) {
    return {
      itemName: "Demo item",
      category: "Other",
      location: "Fridge",
      status: "Use Soon",
      notes: "Add VITE_GEMINI_API_KEY in .env to use real Gemini.",
      confidence: 0,
    };
  }

  const base64 = await fileToBase64(file);
  const mime = file.type || "image/jpeg";

  const prompt =
    "Look at this food photo. Reply with ONLY valid JSON, no markdown. Shape: " +
    '{"itemName":"","category":"Produce|Dairy|Meat|Drink|Leftovers|Other",' +
    '"location":"Fridge|Freezer|Pantry","status":"Fresh|Use Soon|Expired",' +
    '"notes":"","confidence":0.9}';

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mime, data: base64 } },
            ],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Gemini request failed (status " + res.status + ")");
  }

  const data = await res.json();
  const parts = data.candidates && data.candidates[0] && data.candidates[0].content
    ? data.candidates[0].content.parts
    : [];
  let text = "";
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].text) text += parts[i].text;
  }

  const parsed = parseFoodJson(text);
  if (!parsed) {
    throw new Error("Could not understand AI response");
  }
  return parsed;
}
