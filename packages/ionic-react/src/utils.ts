import characters from './characters.json';
import { Character } from './types.js';

export const getCharacterData = (): Character[] => {
  
  return characters.characters
    .filter(character => character.characterImageThumb != null && character.characterImageFull != null)
    .map(cleanData)
    .map((character, index) => {
      return {
          id: index,
          ...character
      };
    })
}

function cleanData(character: any): Character {
  return {
      ...character,
      killed: character.killed || [],
      killedBy: character.killedBy || [],
      houseName: character.houseName || '',
      siblings: character.siblings || []
  };
}

export function matchCharacterName(searchText: string) {
    return (character: Character) => {
      if (searchText === '') {
        return true;
      }
      const regex = new RegExp(searchText,'gi');
      return !!character.characterName.match(regex);
    };
  }