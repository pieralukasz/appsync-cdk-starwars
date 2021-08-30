import uuid from "../utils/uuid";
import checkPlanet from "../utils/checkPlanet";
import checkEpisodes from "../utils/checkEpisodes";
import checkValues from "../utils/checkValues";
import checkName from "../utils/checkName";

import { Character } from "../Character";

const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

const createCharacter = async ({
  name,
  episodes,
  planet,
}: Omit<Character, "id">): Promise<Character | null> => {
  const id = uuid();

  const characterParams = {
    TableName: process.env.CHARACTER_TABLE,
    ExpressionAttributeValues: {
      ":char_name": name,
    },
    FilterExpression: "#character_name = :char_name",
    ExpressionAttributeNames: {
      "#character_name": "name",
    },
  };

  const planetParams = {
    TableName: process.env.PLANET_TABLE,
    ExpressionAttributeValues: {
      ":planet": planet,
    },
    FilterExpression: "#planet_name = :planet",
    ExpressionAttributeNames: {
      "#planet_name": "name",
    },
  };

  const episodesParams = {
    TableName: process.env.EPISODE_TABLE,
  };

  const params = {
    TableName: process.env.CHARACTER_TABLE,
    Item: { id, name, episodes, planet },
  };

  try {
    checkValues(name, planet, episodes);

    const { Items: dynamoCharacters } = await docClient
      .scan(characterParams)
      .promise();

    checkName(dynamoCharacters);

    const { Items: dynamoPlanets } = await docClient
      .scan(planetParams)
      .promise();

    checkPlanet(dynamoPlanets, planet);

    const { Items: dynamoEpisodes } = await docClient
      .scan(episodesParams)
      .promise();

    checkEpisodes(dynamoEpisodes, episodes);

    await docClient.put(params).promise();
    return params.Item;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export default createCharacter;
