import axios from "axios";

const fetchHundredMostPopularPodcasts = () => {
    return axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
}

/**
 * Mock call to the podcast details service that does not work as expected
 * @param {*} podcastId 
 * @returns 
 */
const fetchPodcast = (podcastId) => {
    return new Promise((resolve, reject) => {
        axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
            .then(response => {
                let podcastList = response.data.feed.entry;

                let podcastResponse =
                podcastList.filter(podcastElement => 
                    podcastElement.id.attributes['im:id'] == podcastId
                )[0];

                resolve(podcastResponse);
            })
            .catch(error => {
                reject(error);
            })
    });
}

export { 
    fetchHundredMostPopularPodcasts, 
    fetchPodcast 
};