import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Podcast } from './routes/Podcast';
import { Episode } from './routes/Episode';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Home } from './routes/Home';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/podcast/:podcastId" element={<Podcast/>}/>
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode/>}/>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
