import axios from "axios";
import React, { useEffect, useState } from "react";
import { PodcastCard } from "../../components/PodcastCard";
import './styles.css';

export const Home = () => {

    const [podcastList, setPodcastList] = useState([]);
    const [filteredPodcastList, setFilteredPodcastList] = useState([]);
    const [filterText, setFilterText] = useState(null);

    useEffect(() => {
        axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(response => {
            setPodcastList(response.data.feed.entry);
            setFilteredPodcastList(response.data.feed.entry);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        setFilteredPodcastList(podcastList.filter(podcastFilterHandler));
    }, [filterText]);

    const handleFilterChange = (e) => {
        e.preventDefault();
        if(!e.target.value || e.target.value === '') {
            setFilterText(null);
        } else {
            setFilterText(e.target.value.toLowerCase());
        }
    }

    const podcastFilterHandler = (podcast) => {
        let filterTextPresent = filterText !== null && filterText !== undefined;
        let filterTextMatchesName = false;
        let filterTextMatchesAuthor = false;

        if(filterTextPresent) {
            filterTextMatchesName = podcast['im:name'].label.toLowerCase().includes(filterText);
            filterTextMatchesAuthor = podcast['im:artist'].label.includes(filterText);
        }

        return !filterTextPresent || filterTextMatchesName || filterTextMatchesAuthor;
    }

    return (
        <div className="home">
            <div className="home__header">
                <div className="home__count">{filteredPodcastList.length}</div>
                <input className="home__filter" type="text" placeholder="Filter podcasts..." onChange={handleFilterChange}/>
            </div>
            <div className="home__podcastList">
                {
                    filteredPodcastList.map((podcast, i) => <PodcastCard 
                        key={podcast.id.attributes['im:id']}
                        id={podcast.id.attributes['im:id']}
                        title={podcast['im:name'].label}
                        author={podcast['im:artist'].label}
                        icon={podcast['im:image'][podcast['im:image'].length - 1].label}
                    />)
                }
            </div>
        </div>
    )
}