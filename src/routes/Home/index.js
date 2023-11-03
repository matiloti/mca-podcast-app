import React, { useEffect, useState } from "react";
import { PodcastCard } from "../../components/PodcastCard";
import './styles.css';
import { fetchHundredMostPopularPodcasts } from "../../services/podcast";
import { useLoading } from "../../context/loadingContext";

export const Home = () => {

    const [podcastList, setPodcastList] = useState(JSON.parse(localStorage.getItem('podcastList')) || []);
    const [filteredPodcastList, setFilteredPodcastList] = useState(JSON.parse(localStorage.getItem('podcastList')) || []);
    const [filterText, setFilterText] = useState(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        const lastFetchTime = localStorage.getItem('lastFetchTime');
        const dayInMilisecconds = 24 * 60 * 60 * 1000;
        if(!lastFetchTime || (Date.now() - lastFetchTime > dayInMilisecconds)) {
            setLoading(loading => loading + 1);
            fetchHundredMostPopularPodcasts()
            .then(response => {
                setPodcastList(response.data.feed.entry);
                setFilteredPodcastList(response.data.feed.entry);
                localStorage.setItem('podcastList', JSON.stringify(response.data.feed.entry));
                localStorage.setItem('lastFetchTime', Date.now());
            })
            .catch(error => {
                console.log(error);
            })
            .finally(_ => {
                setLoading(loading => loading - 1);
            });
        }
    }, [setLoading]);

    useEffect(() => {
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

        setFilteredPodcastList(podcastList.filter(podcastFilterHandler));
    }, [podcastList, filterText]);

    const handleFilterChange = (e) => {
        e.preventDefault();
        if(!e.target.value || e.target.value === '') {
            setFilterText(null);
        } else {
            setFilterText(e.target.value.toLowerCase());
        }
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