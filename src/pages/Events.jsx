import React from "react";
import events from "../content/events.json";
import "../App.css";

export default function Events() {
  return (
    <section className="events-page" data-aos="fade-up">
      <h2>Events</h2>
      <div className="events-list">
        {events && events.length > 0 ? (
          events.map((event, idx) => (
            <div className="event-card" key={idx}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events listed yet.</p>
        )}
      </div>
    </section>
  );
}
