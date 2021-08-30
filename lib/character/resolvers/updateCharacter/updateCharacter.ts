import checkPlanet from "../utils/checkPlanet";
import checkEpisodes from "../utils/checkEpisodes";
import checkValues from "../utils/checkValues";

import { Character } from "../Character";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
};

const updateCharacter = async (character: Character) => {
  const planetParams = {
    TableName: process.env.PLANET_TABLE,
    ExpressionAttributeValues: {
      ":planet": character.planet,
    },
    FilterExpression: "#planet_name = :planet",
    ExpressionAttributeNames: {
      "#planet_name": "name",
    },
  };

  const episodesParams = {
    TableName: process.env.EPISODE_TABLE,
  };

  let params: Params = {
    TableName: process.env.CHARACTER_TABLE,
    Key: {
      id: character.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW",
  };

  let prefix = "set ";
  let attributes = Object.keys(character);
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute !== "id") {
      params["UpdateExpression"] +=
        prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] =
        character[attribute as keyof typeof character];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  }

  const { name, planet, episodes } = character;

  try {
    checkValues(name, planet, episodes);

    const { Items: dynamoPlanets } = await docClient
      .scan(planetParams)
      .promise();

    checkPlanet(dynamoPlanets, planet);

    const { Items: dynamoEpisodes } = await docClient
      .scan(episodesParams)
      .promise();

    checkEpisodes(dynamoEpisodes, episodes);

    await docClient.update(params).promise();
    return character;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default updateCharacter;
