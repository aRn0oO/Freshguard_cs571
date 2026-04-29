import React from "react";
import { Card } from "react-bootstrap";
import { useInventory } from "../context/InventoryContext";

function toDate(value) {
  const date = new Date(`${value}T12:00:00`);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function weekDays() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
}

function itemsForDay(day, items) {
  return items.filter((item) => {
    if (!item.expiry || item.expiry === "—") return false;
    return isSameDay(toDate(item.expiry), day);
  });
}

export default function CalendarPage() {
  const { items } = useInventory();
  const days = weekDays();

  return (
    <Card className="section border shadow-sm">
      <Card.Body>
        <Card.Title as="h2">Weekly expiry calendar</Card.Title>
        <p className="calendar-subtitle">
          Track which items are expiring over the next 7 days.
        </p>
        <p className="visually-hidden" aria-live="polite">
          Weekly grid with {days.length} days.
        </p>

        <div className="calendar-grid" role="list" aria-label="Items expiring this week">
          {days.map((day) => {
            const dayItems = itemsForDay(day, items);

            return (
              <section key={day.toISOString()} className="calendar-day" role="listitem">
                <header className="calendar-day-header">
                  <p className="calendar-day-name">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className="calendar-day-date">
                    {day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </header>

                <div className="calendar-day-items">
                  {dayItems.length === 0 ? (
                    <p className="calendar-empty">No expirations</p>
                  ) : (
                    dayItems.map((item) => (
                      <article key={item.id} className="calendar-item">
                        <strong>{item.name}</strong>
                        <span>{item.location}</span>
                        <span>{item.status}</span>
                      </article>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}
