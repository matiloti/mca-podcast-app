import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PodcastSummary } from "../../components/PodcastSummary";
import { fetchPodcast } from "../../services/podcast";
import { fetchEpisodeFromPodcast } from "../../services/episode";
import './styles.css';
import { parseEpisode, parsePodcast } from "../../utils/common";
import { useLoading } from "../../context/loadingContext";

export const Episode = () => {

    const { podcastId, episodeId } = useParams();
    const [podcast, setPodcast] = useState(parsePodcast(JSON.parse(localStorage.getItem(`podcast${podcastId}`))));
    const [ episode, setEpisode ] = useState(parseEpisode(JSON.parse(localStorage.getItem(`podcast${podcastId}_episode${episodeId}`))));
    const { setLoading } = useLoading();

    useEffect(() => {
        const dayInMilisecconds = 24 * 60 * 60 * 1000;

        const lastFetchTimeEpisode = localStorage.getItem(`podcast${podcastId}_episode${episodeId}_lastFetchTime`);
        if(!lastFetchTimeEpisode || (Date.now() - lastFetchTimeEpisode > dayInMilisecconds)) {
            setLoading(loading => loading + 1);
            fetchEpisodeFromPodcast(podcastId, episodeId)
                .then(response => {
                    localStorage.setItem(`podcast${podcastId}_episode${episodeId}`, JSON.stringify(response));
                    localStorage.setItem(`podcast${podcastId}_episode${episodeId}_lastFetchTime`, Date.now());
                    setEpisode(response);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(_ => {
                    setLoading(loading => loading - 1);
                });
        }

        const lastFetchTimePodcast = localStorage.getItem(`podcast${podcastId}_lastFetchTime`);
        if(!lastFetchTimePodcast || (Date.now() - lastFetchTimePodcast > dayInMilisecconds)) {
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
    }, [podcastId, episodeId, setLoading]);

    return (
        <div className="episode">
            <div>
                <PodcastSummary podcast={podcast}/>
            </div>
            <div>
                <div className="episode__details">
                    <h2>{episode.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: episode.description}}/>
                    <audio controls className="">
                        <source src={episode.url} type="audio/ogg"/>
                        Your browser does not support the audio element
                    </audio>
                </div>
            </div>
        </div>
    )
}