import React, { useState } from "react";
import "../App.css";

export default function ContactForm({ isPopup, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // In a real site, you would send the form data to an email or backend here
  }

  return (
    <section className={isPopup ? "contact-popup" : "contact-page"} data-aos="fade-up">
      <h2>Contact</h2>
      {submitted ? (
        <div className="contact-success">Thank you for reaching out! I will get back to you soon.</div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
          <label>
            Name*
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email*
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Mobile (optional)
            <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} pattern="[0-9\-\+ ]*" />
          </label>
          <label>
            Message*
            <textarea name="message" value={form.message} onChange={handleChange} required rows={4} />
          </label>
          <button type="submit" className="contact-btn">Send</button>
        </form>
      )}
      {isPopup && onClose && (
        <button className="contact-popup-close-btn" onClick={onClose} type="button">Close</button>
      )}
    </section>
  );
}
