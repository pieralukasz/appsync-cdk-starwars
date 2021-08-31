import checkEpisodes from "./checkEpisodes";

const dynamoEpisodes = [
  {
    id: "episode-1",
    title: "A New Hope",
  },
];

describe("checkEpisodes", () => {
  it("should throw duplicate error", () => {
    const episodes = ["A New Hope", "A New Hope"];

    expect(() => checkEpisodes(dynamoEpisodes, episodes)).toThrow(
      `Please provide an episodes list without duplicates.`,
    );
  });

  it("should throw error list", () => {
    const episodes: any = [];

    expect(() => checkEpisodes(dynamoEpisodes, episodes)).toThrow(
      `Please provide a correct episodes title list.`,
    );
  });

  it("should throw error title error", () => {
    const episodes = ["Random Title"];

    expect(() => checkEpisodes(dynamoEpisodes, episodes)).toThrow(
      `Please provide a correct episodes name in array from StarWars universe. The title ${
        episodes[0]
      } is not exist on the StarWars universe list: ${JSON.stringify(
        dynamoEpisodes.map((episode) => episode.title),
      )}`,
    );
  });
});
