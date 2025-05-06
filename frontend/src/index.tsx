/*
index.tsx
Description: This file holds routing for the frontend.
Written by: Abe Gomez and Anna Chen

*/


import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomListPage from './components/pages/RoomListPage';
import HomePage from './components/pages/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/rooms-list" element={<RoomListPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
