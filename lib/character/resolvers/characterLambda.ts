import createCharacter from "./createCharacter";
import getCharacterById from "./getCharacterById";
import getAllCharacters from "./getAllCharacters";
import deleteCharacter from "./deleteCharacter";
import updateCharacter from "./updateCharacter";

import { Character } from "./Character";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    characterId: string;
    character: Character;
    limit: number;
  };
};

const handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "getCharacterById":
      return await getCharacterById(event.arguments.characterId);
    case "getAllCharacters":
      return await getAllCharacters(
        event.arguments.limit,
        event.arguments.characterId,
      );
    case "createCharacter":
      return await createCharacter(event.arguments.character);
    case "updateCharacter":
      return await updateCharacter(event.arguments.character);
    case "deleteCharacter":
      return await deleteCharacter(event.arguments.characterId);
    default:
      return null;
  }
};

exports.handler = handler;
