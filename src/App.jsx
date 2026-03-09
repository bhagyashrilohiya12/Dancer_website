
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FaPlayCircle, FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [bio, setBio] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [events, setEvents] = useState([]);
  const [contact, setContact] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [socials, setSocials] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryTab, setGalleryTab] = useState('photos');
  const [videoModal, setVideoModal] = useState({ open: false, url: '' });

  useEffect(() => {
    fetch('/content/bio.json').then(r => r.json()).then(setBio);
    fetch('/content/gallery.json').then(r => r.json()).then(setGallery);
    fetch('/content/videos.json').then(r => r.json()).then(setVideos);
    fetch('/content/events.json').then(r => r.json()).then(setEvents);
    fetch('/content/contact.json').then(r => r.json()).then(setContact);
    fetch('/content/testimonials.json').then(r => r.json()).then(setTestimonials);
    fetch('/content/socials.json').then(r => r.json()).then(setSocials);
    AOS.init({ duration: 900, once: true, offset: 80 });
    // Parallax effect for hero video
    const handleScroll = () => {
      const video = document.querySelector('.hero-video');
      if (video) {
        const scrollY = window.scrollY;
        video.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return (
      <>
        <section className="hero" data-aos="fade-in">
          <div className="hero-bg">
            <video className="hero-video" autoPlay loop muted playsInline poster="/src/assets/hero.jpg">
              <source src="/src/assets/hero-video.mp4" type="video/mp4" />
              <img src="/src/assets/hero.jpg" alt="Dancer Hero" className="hero-image" />
            </video>
            <div className="hero-gradient"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title animate-pop">{bio?.name || 'Your Name'}</h1>
            <h2 className="hero-subtitle animate-fade">{bio?.title || 'Dancer & Choreographer'}</h2>
            <div className="hero-animate"></div>
              <Link to="/work" className="hero-cta">View My Work</Link>

          </div>
        </section>
        <div className="portfolio-container">
          <header style={{display: 'none'}}>
            <h1>{bio?.name || 'Dancer Name'}</h1>
            <h2>{bio?.title || 'Dancer & Choreographer'}</h2>
          </header>
      <section className="bio" data-aos="fade-up">
        <h3>About</h3>
        <p>{bio?.bio || 'Short biography goes here.'}</p>
      </section>
        {/* Featured Work Preview */}
        <section className="featured-work" data-aos="fade-up">
          <h3>Featured Work</h3>
          <div className="gallery-grid">
            {gallery.slice(0,2).map((item, idx) => (
              <div key={idx} className="gallery-item" onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}>
                <img src={item.image} alt={item.caption} />
                <p>{item.caption}</p>
              </div>
            ))}
            {videos[0] && (
              <div className="gallery-item video-item" onClick={() => setVideoModal({ open: true, url: videos[0].url })}>
                <img src={videos[0].thumbnail} alt={videos[0].caption} />
                <FaPlayCircle className="video-play-icon" />
                <p>{videos[0].caption}</p>
              </div>
            )}
          </div>
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={lightboxIndex}
            slides={gallery.slice(0,2).map(item => ({ src: item.image, alt: item.caption }))}
          />
          {videoModal.open && (
            <div className="video-modal" onClick={() => setVideoModal({ open: false, url: '' })}>
              <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <iframe
                  width="560"
                  height="315"
                  src={videoModal.url.replace('watch?v=', 'embed/')}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button className="video-modal-close" onClick={() => setVideoModal({ open: false, url: '' })}>Close</button>
              </div>
            </div>
          )}
        </section>
      <section className="events" data-aos="fade-up">
        <h3>Events</h3>
        <ul>
          {events.map((event, idx) => (
            <li key={idx}>
              <strong>{event.title}</strong> <br />
              <span>{event.date} | {event.location}</span>
              <div>{event.description}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="contact" data-aos="fade-up">
        <h3>Contact</h3>
        <ul>
          {contact?.email && <li>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
          {contact?.phone && <li>Phone: {contact.phone}</li>}
        </ul>
        <div className="social-icons">
          {socials.instagram && (
            <a href={`https://instagram.com/${socials.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          )}
          {socials.facebook && (
            <a href={`https://facebook.com/${socials.facebook}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
          )}
          {socials.youtube && (
            <a href={`https://youtube.com/${socials.youtube}`} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          )}
          {socials.tiktok && (
            <a href={`https://tiktok.com/@${socials.tiktok}`} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
          )}
        </div>
      </section>

      <section className="testimonials" data-aos="fade-up">
        <h3>Testimonials</h3>
        <div className="testimonials-list">
          {testimonials.map((t, idx) => (
            <blockquote key={idx} className="testimonial">
              <p>“{t.quote}”</p>
              <footer>- {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>
      <footer>
        <small>Portfolio website &copy; {new Date().getFullYear()}</small>
      </footer>
      </div>
    </>
  );
}

export default App;
