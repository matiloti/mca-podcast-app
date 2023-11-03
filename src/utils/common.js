import { episodesMock } from "../resources/test/episodesMock";

const parsePodcast = (value) => {
    if(value !== null && value !== undefined) {
        return {
            id: value.id.attributes['im:id'],
            title: value['im:name'].label,
            author: value['im:artist'].label,
            description: value['summary'].label,
            image: value['im:image'][value['im:image'].length -1].label,
            episodes: episodesMock
        };
    }

    return {
        id: null,
        title: "",
        author: "",
        description: "",
        image: null,
        episodes: []
    };
}

const parseEpisode = (value) => {
    if(value !== null && value !== undefined) {
        return value;
    }

    return {
        id: null,
        title: '',
        date: '',
        duration: ''
    };
}

export { parsePodcast, parseEpisode };