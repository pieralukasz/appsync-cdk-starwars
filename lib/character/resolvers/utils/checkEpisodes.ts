type Episode = {
  id: string;
  title: string;
};

const checkEpisodes = (dynamoEpisodes: Episode[], episodes: string[]) => {
  const episodeTitles = dynamoEpisodes?.map(
    (episode: Episode) => episode.title,
  );

  if (episodes.length !== new Set(episodes).size) {
    throw new Error(`Please provide an episodes list without duplicates.`);
  }

  if (episodes.length === 0 || episodes.length > episodeTitles?.length) {
    throw new Error(`Please provide a correct episodes title list.`);
  }

  for (let episode of episodes) {
    if (episodeTitles?.indexOf(episode) < 0) {
      throw new Error(
        `Please provide a correct episodes name in array from StarWars universe. The title ${episode} is not exist on the StarWars universe list: ${JSON.stringify(
          episodeTitles,
        )}.`,
      );
    }
  }
};

export default checkEpisodes;
