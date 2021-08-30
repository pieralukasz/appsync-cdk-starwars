import { Character } from "../Character";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const getAllCharacters = async (
  limit: number = 5,
  lastEvaluatedKey?: string,
): Promise<Character[] | null> => {
  let params: any = {
    TableName: process.env.CHARACTER_TABLE,
    Limit: limit,
  };

  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = { id: lastEvaluatedKey };
  }

  try {
    const { Items } = await docClient.scan(params).promise();
    return Items;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export default getAllCharacters;
