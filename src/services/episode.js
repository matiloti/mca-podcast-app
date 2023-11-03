import { episodesMock } from "../resources/test/episodesMock";

const fetchEpisodesMock = (episodeId) => {
    return new Promise((resolve, reject) => {
        let episode = episodesMock.filter(episode => episode.id == episodeId)[0];
        
        if(episode) {
            resolve(episode);
        } else {
            reject("ID does not exist");
        }
    });
}

const fetchEpisodeFromPodcast = (podcastId, episodeId) => {
    return fetchEpisodesMock(episodeId);
};

export { fetchEpisodeFromPodcast };