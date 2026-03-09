import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './pages/Contact';

export default function Layout() {
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => {
    const handler = () => setContactOpen(true);
    window.addEventListener('openContactPopup', handler);
    return () => window.removeEventListener('openContactPopup', handler);
  }, []);
  return (
    <>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/photos">Photos</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/collaborate">Collaborate</Link>
        <button className="contact-popup-btn" onClick={() => setContactOpen(true)} type="button">Contact</button>
      </nav>
      {contactOpen && (
        <div className="contact-popup-overlay" onClick={() => setContactOpen(false)}>
          <div className="contact-popup-modal" onClick={e => e.stopPropagation()}>
            <button className="contact-popup-close" onClick={() => setContactOpen(false)}>&times;</button>
            <ContactForm isPopup onClose={() => setContactOpen(false)} />
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
