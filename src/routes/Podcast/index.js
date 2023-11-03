import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import './styles.css';
import { PodcastSummary } from "../../components/PodcastSummary";
import { Link } from "react-router-dom";
import { fetchPodcast } from "../../services/podcast";
import { parsePodcast } from "../../utils/common";
import { useLoading } from "../../context/loadingContext";

export const Podcast = () => {

    const { podcastId } = useParams();
    const [podcast, setPodcast] = useState(parsePodcast(JSON.parse(localStorage.getItem(`podcast${podcastId}`))));
    const { setLoading } = useLoading();

    useEffect(() => {
        const lastFetchTime = localStorage.getItem(`podcast${podcastId}_lastFetchTime`);
        const dayInMilisecconds = 24 * 60 * 60 * 1000;
        if(!lastFetchTime || (Date.now() - lastFetchTime > dayInMilisecconds)) {
            setLoading(loading => loading + 1);
            fetchPodcast(podcastId)
                .then(response => {
                    localStorage.setItem(`podcast${podcastId}`, JSON.stringify(response));
                    localStorage.setItem(`podcast${podcastId}_lastFetchTime`, Date.now());
                    setPodcast(parsePodcast(response));
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(_ => {
                    setLoading(loading => loading - 1);
                });
        }
        /**
         * Response structure does not contain episodes data and no information about description
         */

        // axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}`)}`)
        // .then(response => {
        //     console.log(JSON.parse(response.data.contents));

        //     // Response structure does not contain episodes
        //     // setPodcast(JSON.parse(response.data.contents));
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }, [podcastId, setLoading]);

    return (
        <div className="podcast">
            <PodcastSummary podcast={podcast}/>
            <div className="podcast__episodes">
                <div className="podcast__episodes-count">
                    Episodes: {podcast.episodes.length}
                </div>
                <div className="podcast__episodes-table">
                    <div className="podcast__episodes-row-wrapper">
                        <div className="podcast__episodes-header">Title</div>
                        <div className="podcast__episodes-header">Date</div>
                        <div className="podcast__episodes-header">Duration</div>
                    </div>
                    {
                        podcast.episodes.map(episode => 
                            <div key={`${podcast.id}${episode.id}`} className="podcast__episodes-row-wrapper">
                                <div><Link to={`/podcast/${podcastId}/episode/${episode.id}`} className="podcast__episodes-link">{episode.title}</Link></div>
                                <div>{episode.date}</div>
                                <div>{episode.duration}</div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}