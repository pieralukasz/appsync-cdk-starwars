import checkPlanet from "./checkPlanet";

const dynamoPlanets: any = [];

describe("checkPlanet", () => {
  it("should throw credential error", () => {
    expect(() => checkPlanet(dynamoPlanets, "Earth")).toThrow(
      `Please provide a correct planet name from StarWars universe. The name Earth is not on the list of planets.`,
    );
  });
});
