import { useEffect, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import '../App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoModal, setVideoModal] = useState({ open: false, url: '' });

  useEffect(() => {
    fetch('/content/videos.json').then(r => r.json()).then(setVideos);
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  return (
    <section className="gallery" id="videos" data-aos="fade-in">
      <h2 data-aos="fade-up">Video Gallery</h2>
      <div className="gallery-grid">
        {videos.map((video, idx) => (
          <div key={idx} className="gallery-item video-item" data-aos="zoom-in" data-aos-delay={idx * 60} onClick={() => setVideoModal({ open: true, url: video.url })}>
            <img src={video.thumbnail} alt={video.caption} />
            <FaPlayCircle className="video-play-icon" />
            <p>{video.caption}</p>
          </div>
        ))}
      </div>
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
  );
}
