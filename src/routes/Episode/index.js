import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PodcastSummary } from "../../components/PodcastSummary";
import { fetchHundredMostPopularPodcasts } from "../../services/podcast";
import { fetchEpisodeFromPodcast } from "../../services/episode";
import './styles.css';

export const Episode = () => {

    const { podcastId, episodeId } = useParams();
    const [ podcast, setPodcast ] = useState({});
    const [ episode, setEpisode ] = useState(
        {
            id: null,
            title: '',
            date: '',
            duration: ''
        }
    );

    useEffect(() => {
        Promise.all([
            fetchEpisodeFromPodcast(podcastId, episodeId), 
            fetchHundredMostPopularPodcasts()
        ])
            .then(values => {
                let podcastResponse =
                values[1].data.feed.entry.filter(podcastElement => 
                    podcastElement.id.attributes['im:id'] == podcastId
                )[0];
            
                setPodcast(podcast => ({
                    ...podcast,
                    id: podcastResponse.id.attributes['im:id'],
                    title: podcastResponse['im:name'].label,
                    author: podcastResponse['im:artist'].label,
                    description: podcastResponse['summary'].label,
                    image: podcastResponse['im:image'][podcastResponse['im:image'].length -1].label,
                }));

                setEpisode(values[0]);
            })
            .catch(error => {
                console.log(error);
            })
    }, [podcastId, episodeId]);

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