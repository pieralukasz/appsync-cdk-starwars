const checkValues = (name: string, planet: string, episodes: string[]) => {
  if (name === "" || name.length <= 3) {
    throw new Error(
      `Please provide a correct character name. The name ${name} is to short.`,
    );
  }

  if (planet === "" || planet.length < 3) {
    throw new Error(
      `Please provide a correct planet name. The name ${planet} is to short.`,
    );
  }

  if (episodes.length === 0) {
    throw new Error(
      `Please provide a correct episodes title list. The ${episodes} list is to short.`,
    );
  }

  if (episodes.length !== new Set(episodes).size) {
    throw new Error(`Please provide an episodes list without duplicates.`);
  }
};

export default checkValues;
