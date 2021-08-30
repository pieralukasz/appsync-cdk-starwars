const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteCharacter = async (characterId: string): Promise<String | null> => {
  const params = {
    TableName: process.env.CHARACTER_TABLE,
    Key: {
      id: characterId,
    },
  };

  try {
    await docClient.delete(params).promise();
    return "Successfully deleted";
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default deleteCharacter;
