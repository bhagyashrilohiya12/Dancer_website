import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../App.css';

export default function Photos() {
  const [gallery, setGallery] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const slides = gallery.filter(item => item.image || item.imageLink);

  useEffect(() => {
    fetch('/content/gallery.json').then(r => r.json()).then(setGallery);
  }, []);

  return (
    <section className="gallery" id="gallery" data-aos="fade-in">
      <h2 data-aos="fade-up">Photo Gallery</h2>
      <div className="gallery-grid">
        {gallery.map((item, idx) => {
          const imgSrc = item.image ? item.image : item.imageLink;
          const slideIndex = imgSrc ? slides.indexOf(item) : -1;
          return (
            <div key={idx} className={`gallery-item ${imgSrc ? '' : 'is-placeholder'}`} data-aos="zoom-in" data-aos-delay={idx * 60}>
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={item.caption}
                  onClick={() => {
                    if (slideIndex < 0) return;
                    setLightboxIndex(slideIndex);
                    setLightboxOpen(true);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <div className="media-placeholder">Add photo</div>
              )}
              <p>{item.caption}</p>
            </div>
          );
        })}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides.map(item => ({ src: item.image ? item.image : item.imageLink, alt: item.caption }))}
      />
    </section>
  );
}
