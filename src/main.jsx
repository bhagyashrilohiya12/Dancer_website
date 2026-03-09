import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Photos from './pages/Photos.jsx';
import Videos from './pages/Videos.jsx';
import Work from './pages/Work.jsx';
import Events from './pages/Events.jsx';
import Collaborate from './pages/Collaborate.jsx';
import Contact from './pages/Contact.jsx';
import Layout from './Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="work" element={<Work />} />
          <Route path="photos" element={<Photos />} />
          <Route path="videos" element={<Videos />} />
          <Route path="events" element={<Events />} />
          <Route path="collaborate" element={<Collaborate />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
