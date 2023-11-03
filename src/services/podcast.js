import axios from "axios";

const fetchHundredMostPopularPodcasts = () => {
    return axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
}

export { fetchHundredMostPopularPodcasts };