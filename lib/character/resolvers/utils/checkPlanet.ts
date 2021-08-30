type Planets = {
  id: string;
  name: string;
};

const checkPlanet = (dynamoPlanets: Planets[], planet: string) => {
  if (dynamoPlanets?.length === 0) {
    throw new Error(
      `Please provide a correct planet name from StarWars universe. The name ${planet} is not on the list of planets.`,
    );
  }
};

export default checkPlanet;
