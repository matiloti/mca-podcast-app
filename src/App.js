import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { Podcast } from './routes/Podcast';
import { Episode } from './routes/Episode';
import { Header } from './components/Header';
import { Home } from './routes/Home';
import { LoadingContext } from "./context/loadingContext";

export const App = () => {
    const [loading, setLoading] = useState(0);

    return (
        <LoadingContext.Provider value={{loading, setLoading}}>
            <Header loading={loading}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/podcast/:podcastId" element={<Podcast/>}/>
                <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode/>}/>
            </Routes>
        </LoadingContext.Provider>
    );
}