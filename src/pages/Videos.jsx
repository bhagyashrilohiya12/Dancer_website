import { useEffect, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import '../App.css';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoModal, setVideoModal] = useState({ open: false, url: '' });

  useEffect(() => {
    fetch('/content/videos.json').then(r => r.json()).then(setVideos);
  }, []);

  return (
    <section className="gallery" id="videos" data-aos="fade-in">
      <h2 data-aos="fade-up">Video Gallery</h2>
      <div className="gallery-grid">
        {videos.map((video, idx) => {
          const videoSrc = video.video ? video.video : video.url;
          return (
            <div
              key={idx}
              className={`gallery-item video-item ${videoSrc ? '' : 'is-placeholder'}`}
              data-aos="zoom-in"
              data-aos-delay={idx * 60}
              onClick={() => {
                if (!videoSrc) return;
                setVideoModal({ open: true, url: videoSrc });
              }}
            >
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.caption} />
              ) : (
                <div className="media-placeholder">Add video</div>
              )}
              {videoSrc && <FaPlayCircle className="video-play-icon" />}
              <p>{video.caption}</p>
            </div>
          );
        })}
      </div>
      {videoModal.open && (
        <div className="video-modal" onClick={() => setVideoModal({ open: false, url: '' })}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            {videoModal.url && videoModal.url.match(/^https?:\/\//) ? (
              <iframe
                width="560"
                height="315"
                src={videoModal.url.replace('watch?v=', 'embed/')}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video width="560" height="315" controls>
                <source src={videoModal.url} />
                Your browser does not support the video tag.
              </video>
            )}
            <button className="video-modal-close" onClick={() => setVideoModal({ open: false, url: '' })}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
