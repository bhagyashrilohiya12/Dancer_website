import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './pages/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Layout() {
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
    const handler = () => setContactOpen(true);
    window.addEventListener('openContactPopup', handler);
    return () => window.removeEventListener('openContactPopup', handler);
  }, []);
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);
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
