import { Character } from "../Character";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getCharacterById = async (
  characterId: String,
): Promise<Character | null> => {
  const params = {
    TableName: process.env.CHARACTER_TABLE,
    Key: { id: characterId },
  };

  try {
    const { Item } = await docClient.get(params).promise();
    return Item as Character;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export default getCharacterById;
