
import React, { useEffect, useState } from "react";
import "../App.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("/content/events.json")
      .then((r) => r.json())
      .then(setEvents);
  }, []);
  return (
    <section className="events-page" data-aos="fade-up">
      <h2>Events</h2>
      <div className="events-list">
        {events && events.length > 0 ? (
          events.map((event, idx) => (
            <div className="event-card" key={idx}>
              <h3 style={{ textAlign: 'center', margin: '0.5rem 0' }}>{event.title}</h3>
              <p style={{ textAlign: 'center', margin: 0 }}>{event.date}</p>
              <p style={{ textAlign: 'center', margin: 0 }}>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events listed yet.</p>
        )}
      </div>
    </section>
  );
}
