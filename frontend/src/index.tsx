import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomPage from './components/pages/RoomPage';
import HomePage from './components/pages/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/rooms-list" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
