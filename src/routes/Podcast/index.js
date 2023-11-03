import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import './styles.css';
import { PodcastSummary } from "../../components/PodcastSummary";
import { Link } from "react-router-dom";
import { fetchHundredMostPopularPodcasts } from "../../services/podcast";
import { episodesMock } from "../../resources/test/episodesMock";

export const Podcast = () => {

    const { podcastId } = useParams();
    const [podcast, setPodcast] = useState({
        id: null,
        title: "",
        author: "",
        description: "",
        image: null,
        episodes: []
    });

    useEffect(() => {
        fetchHundredMostPopularPodcasts()
            .then(response => {
                let podcastResponse =
                response.data.feed.entry.filter(podcastElement => 
                    podcastElement.id.attributes['im:id'] == podcastId
                )[0];
            
                setPodcast(podcast => ({
                    ...podcast,
                    id: podcastResponse.id.attributes['im:id'],
                    title: podcastResponse['im:name'].label,
                    author: podcastResponse['im:artist'].label,
                    description: podcastResponse['summary'].label,
                    image: podcastResponse['im:image'][podcastResponse['im:image'].length -1].label,
                    episodes: episodesMock
                }));
            })
            .catch(error => {
                console.log(error);
            })
            
        /**
         * Response structure does not contain episodes data
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
    }, [podcastId]);

    useEffect(() => {
        console.log(podcast);
    }, [podcast]);

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