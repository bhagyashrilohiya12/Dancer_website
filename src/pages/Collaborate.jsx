import React, { useEffect, useState } from "react";
import "../App.css";

export default function Collaborate() {
  const [contact, setContact] = useState({ email: "" });
  useEffect(() => {
    fetch('/content/contact.json').then(r => r.json()).then(setContact);
  }, []);
  return (
    <section className="collaborate-page" data-aos="fade-up">
      <h2>Collaborate</h2>
      <p>Interested in collaborating? Whether you’re a fellow artist, event organizer, or brand, let’s create something amazing together!</p>
      <div className="collaborate-options">
        <a href={`mailto:${contact.email || 'your@email.com'}`} className="collab-btn">Email Me</a>
        <button className="collab-btn" onClick={() => window.dispatchEvent(new CustomEvent('openContactPopup'))}>Contact Form</button>
      </div>
      <p style={{marginTop: '2rem', color: '#aaa'}}>You can also reach out via my social media links below.</p>
    </section>
  );
}
