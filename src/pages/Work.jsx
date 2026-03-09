import React from "react";
import { Link } from "react-router-dom";
import { FaPhotoVideo, FaImages } from "react-icons/fa";
import "../App.css";

export default function Work() {
  return (
    <section className="work-chooser" data-aos="fade-up">
      <h2>My Work</h2>
      <p>Select what you want to explore:</p>
      <div className="work-options">
        <Link to="/photos" className="work-option">
          <FaImages size={48} />
          <span>Photos</span>
        </Link>
        <Link to="/videos" className="work-option">
          <FaPhotoVideo size={48} />
          <span>Videos</span>
        </Link>
      </div>
    </section>
  );
}
