import { Character } from "../Character";

const checkName = (dynamoCharacter: Character[]) => {
  if (dynamoCharacter?.length > 0) {
    throw new Error(`Something wrong with your credentials..`);
  }
};

export default checkName;
