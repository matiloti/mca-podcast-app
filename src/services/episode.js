const fetchEpisodesMock = (episodeId) => {
    return new Promise((resolve, reject) => {
        if(episodeId == 1) {
            resolve(
                {
                    id: 1,
                    title: "one",
                    description: 'lorem ipsum one',
                    url: "#",
                }
            );
        } else if(episodeId == 2) {
            resolve(
                {
                    id: 2,
                    title: "two",
                    description: 'lorem ipsum two',
                    url: "#",
                }
            );
        } else if(episodeId == 3) {
            resolve(
                {
                    id: 3,
                    title: "three",
                    description: 'lorem ipsum three',
                    url: "#",
                }
            );
        } else if(episodeId == 4) {
            resolve(
                {
                    id: 4,
                    title: "Long text",
                    description: 'Eu amet laborum nostrud labore enim. Quis dolor reprehenderit quis pariatur officia reprehenderit Lorem incididunt laborum voluptate cillum ex pariatur veniam. Qui laboris occaecat consequat aute commodo consectetur.Eiusmod proident ipsum quis veniam ex nulla laboris. Ullamco do deserunt amet irure quis pariatur anim aliqua irure consectetur anim anim eu in. Labore aliquip eu ipsum sit exercitation. Ad est commodo ex laborum non dolore deserunt. Tempor culpa eu consectetur proident labore amet irure ullamco velit sit sint non qui. Dolore magna mollit ipsum est Lorem. Ea qui enim commodo laborum quis nulla.Esse mollit nostrud Lorem aliqua ut ipsum sit est aliqua sint aliquip laboris tempor.Ex eiusmod pariatur dolore velit laboris et ex irure ullamco veniam laboris.Ex magna quis ex ullamco consequat pariatur cillum.Tempor nulla duis dolor ea dolor aliquip magna irure voluptate sint. Reprehenderit qui minim fugiat ut eu mollit reprehenderit minim et ipsum. Commodo sint exercitation enim in laboris et reprehenderit irure amet culpa duis id. Deserunt sint non ea proident sunt elit velit excepteur. Aliquip anim labore laboris sunt ad cillum nulla proident reprehenderit. Labore fugiat et labore labore et enim elit aliquip sint ex duis ipsum nulla aliquip. Est dolor nisi reprehenderit eiusmod fugiat excepteur veniam dolor eu dolor nisi.',
                    url: "#",
                }
            );
        } else if(episodeId == 5) {
            resolve(
                {
                    id: 5,
                    title: "This one contains HTML",
                    description: '<p>This one contains <b>html code</b></p><ul><li>a</li><li>b</li></ul>',
                    url: "#",
                }
            );
        } else {
            reject("ID does not exist");
        }
    });
}

const fetchEpisodeFromPodcast = (podcastId, episodeId) => {
    console.log(episodeId);
    return fetchEpisodesMock(episodeId);
};

export { fetchEpisodeFromPodcast };