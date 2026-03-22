
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FaPlayCircle, FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import heroVideo from './assets/hero-video.mp4';

function App() {
  const [bio, setBio] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [contact, setContact] = useState(null);
  const [events, setEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [socials, setSocials] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoModal, setVideoModal] = useState({ open: false, url: '' });
  const [heroPortraitSrc, setHeroPortraitSrc] = useState('');

  useEffect(() => {
    fetch('/content/bio.json').then(r => r.json()).then(setBio);
    fetch('/content/gallery.json').then(r => r.json()).then(setGallery);
    fetch('/content/videos.json').then(r => r.json()).then(setVideos);
    fetch('/content/contact.json').then(r => r.json()).then(setContact);
    fetch('/content/testimonials.json').then(r => r.json()).then(setTestimonials);
    fetch('/content/socials.json').then(r => r.json()).then(setSocials);
    fetch('/content/events.json').then(r => r.json()).then(setEvents);
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

  useEffect(() => {
    setHeroPortraitSrc(bio?.profileImage || '');
  }, [bio]);

  const pressItems = (bio?.press && bio.press.length > 0)
    ? bio.press
    : ['BBC Arts', 'Nike', "Sadler's Wells"];
  const styleLine = (bio?.styles && bio.styles.length > 0)
    ? bio.styles.join(' / ')
    : 'Contemporary / Afro / Heels';
  const locationLine = bio?.location || 'London, UK';
  const taglineLine = bio?.tagline || 'Movement-driven stories for stage, film, and live events.';
  const availabilityLine = bio?.availability || 'Worldwide - In-person & remote';
  const responseLine = bio?.responseTime || 'Typically replies within 24-48 hours';
  const bookingTypes = (bio?.bookingTypes && bio.bookingTypes.length > 0)
    ? bio.bookingTypes
    : ['Stage performances', 'Music videos', 'Workshops', 'Brand campaigns'];
  const bookingBlurb = bio?.bookingBlurb || 'Available for performance, choreography, and creative collaborations.';

  const featuredPhotos = gallery.filter(item => item.featured);
  const featuredVideos = videos.filter(item => item.featured);
  const displayPhotos = (featuredPhotos.length ? featuredPhotos : gallery).slice(0, 2);
  const displayVideos = (featuredVideos.length ? featuredVideos : videos).slice(0, 1);
  const gallerySlides = gallery.filter(item => item.image || item.imageLink);
  const upcomingEvents = events.slice(0, 2);
  const formatEventDate = (value) => {
    if (!value) return 'Date TBA';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    const parts = parsed.toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const [day, month, year] = parts.split(' ');
    if (!day || !month || !year) return parts;
    return `${day} ${month} ${year}`;
  };

    return (
      <>
        <section className="hero" data-aos="fade-in">
          <div className="hero-bg">
            <video className="hero-video" autoPlay loop muted playsInline>
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="hero-gradient"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title animate-pop">{bio?.name || 'Your Name'}</h1>
            <h2 className="hero-subtitle animate-fade">{bio?.title || 'Dancer & Choreographer'}</h2>
            {taglineLine && <p className="hero-tagline">{taglineLine}</p>}
            <div className="hero-meta">
              <span className="hero-pill">{locationLine}</span>
              <span className="hero-sep">•</span>
              <span className="hero-pill">{styleLine}</span>
            </div>
            {heroPortraitSrc ? (
              <img
                src={heroPortraitSrc}
                alt={bio?.name || 'Profile'}
                className="hero-profile-image"
                onError={() => setHeroPortraitSrc('')}
              />
            ) : (
              <div className="hero-profile-placeholder" aria-label="Photo placeholder">Photo</div>
            )}
              <Link to="/work" className="hero-cta">View My Work</Link>

          </div>
        </section>
        <div className="portfolio-container">
          <header style={{display: 'none'}}>
            <h1>{bio?.name || 'Dancer Name'}</h1>
            <h2>{bio?.title || 'Dancer & Choreographer'}</h2>
          </header>
      <section className="press-strip" data-aos="fade-up">
        <span className="press-label">Featured in</span>
        <div className="press-logos">
          {pressItems.map((item, idx) => (
            <span className="press-logo" key={idx}>{item}</span>
          ))}
        </div>
      </section>
      <section className="bio" data-aos="fade-up">
        <h3>About</h3>
        <p>{bio?.bio || 'Short biography goes here.'}</p>
      </section>
        {/* Featured Work Preview */}
        <section className="featured-work" data-aos="fade-up">
          <h3>Featured Work</h3>
          <div className="gallery-grid">
            {displayPhotos.map((item, idx) => {
              const imgSrc = item.image || item.imageLink;
              const slideIndex = imgSrc ? gallerySlides.indexOf(item) : -1;
              return (
                <div
                  key={`photo-${idx}`}
                  className={`gallery-item ${imgSrc ? '' : 'is-placeholder'}`}
                  onClick={() => {
                    if (!imgSrc || slideIndex < 0) return;
                    setLightboxIndex(slideIndex);
                    setLightboxOpen(true);
                  }}
                >
                  {imgSrc ? (
                    <img src={imgSrc} alt={item.caption} />
                  ) : (
                    <div className="media-placeholder">Add photo</div>
                  )}
                  <p>{item.caption}</p>
                </div>
              );
            })}
            {displayVideos[0] && (
              <div
                className={`gallery-item video-item ${displayVideos[0].url ? '' : 'is-placeholder'}`}
                onClick={() => {
                  if (!displayVideos[0].url) return;
                  setVideoModal({ open: true, url: displayVideos[0].url });
                }}
              >
                {displayVideos[0].thumbnail ? (
                  <img src={displayVideos[0].thumbnail} alt={displayVideos[0].caption} />
                ) : (
                  <div className="media-placeholder">Add video</div>
                )}
                {displayVideos[0].url && <FaPlayCircle className="video-play-icon" />}
                <p>{displayVideos[0].caption}</p>
              </div>
            )}
          </div>
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={lightboxIndex}
            slides={gallerySlides.map(item => ({ src: item.image || item.imageLink, alt: item.caption }))}
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
      <section className="booking" data-aos="fade-up">
        <div className="booking-card">
          <div className="booking-header">
            <h3>Bookings</h3>
            <span className="booking-badge">Open for 2026</span>
          </div>
          <p>{bookingBlurb}</p>
          <div className="booking-meta">
            <span>{availabilityLine}</span>
            <span>{responseLine}</span>
          </div>
          <div className="booking-tags">
            {bookingTypes.map((item, idx) => (
              <span className="booking-tag" key={idx}>{item}</span>
            ))}
          </div>
          <button
            className="booking-cta"
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('openContactPopup'))}
          >
            Book a Project
          </button>
        </div>
      </section>
      <section className="events-home" data-aos="fade-up">
        <div className="events-home-header">
          <h3>Upcoming</h3>
          <Link to="/events" className="events-home-link">View all</Link>
        </div>
        <div className="events-home-grid">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, idx) => (
              <div className="event-card" key={idx}>
                <div className="event-date">{formatEventDate(event.date)}</div>
                <div className="event-body">
                  <h4>{event.title}</h4>
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
