import axios from "axios";
import React, { useEffect, useState } from "react";
import { PodcastCard } from "../../components/PodcastCard";
import './styles.css';

export const Home = () => {

    const [podcastList, setPodcastList] = useState([]);

    useEffect(() => {
        axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(response => {
            setPodcastList(response.data.feed.entry);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div className="podcastList">
            {
                podcastList.map((podcast, i) => <PodcastCard 
                    key={podcast.id.attributes['im:id']}
                    id={podcast.id.attributes['im:id']}
                    title={podcast['im:name'].label}
                    author={podcast['im:artist'].label}
                    icon={podcast['im:image'][podcast['im:image'].length - 1].label}
                />)
            }
        </div>
    )
}