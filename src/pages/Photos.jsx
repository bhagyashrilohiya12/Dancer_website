import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Photos() {
  const [gallery, setGallery] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetch('/src/content/gallery.json').then(r => r.json()).then(setGallery);
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  return (
    <section className="gallery" id="gallery" data-aos="fade-in">
      <h2 data-aos="fade-up">Photo Gallery</h2>
      <div className="gallery-grid">
        {gallery.map((item, idx) => (
          <div key={idx} className="gallery-item" data-aos="zoom-in" data-aos-delay={idx * 60}>
            <img
              src={item.image}
              alt={item.caption}
              onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
              style={{ cursor: 'pointer' }}
            />
            <p>{item.caption}</p>
          </div>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={gallery.map(item => ({ src: item.image, alt: item.caption }))}
      />
    </section>
  );
}
