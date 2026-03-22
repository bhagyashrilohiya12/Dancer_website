
import React, { useEffect, useState } from "react";
import "../App.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const formatEventDate = (value) => {
    if (!value) return "Date TBA";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    const parts = parsed.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const [day, month, year] = parts.split(" ");
    if (!day || !month || !year) return parts;
    return `${day} ${month} ${year}`;
  };
  useEffect(() => {
    fetch("/content/events.json")
      .then((r) => r.json())
      .then(setEvents);
  }, []);
  return (
    <section className="events-page" data-aos="fade-up">
      <h2>Events</h2>
      <p className="events-subtitle">Upcoming performances, workshops, and appearances.</p>
      <div className="events-list">
        {events && events.length > 0 ? (
          events.map((event, idx) => (
            <div className="event-card" key={idx}>
              <div className="event-date">{formatEventDate(event.date)}</div>
              <div className="event-body">
                <h3>{event.title}</h3>
                {event.location && <p className="event-location">{event.location}</p>}
                {event.description && <p className="event-desc">{event.description}</p>}
              </div>
            </div>
          ))
        ) : (
          <div className="events-empty">
            <p>No events listed yet.</p>
            <span>Check back soon or reach out for bookings.</span>
          </div>
        )}
      </div>
    </section>
  );
}
