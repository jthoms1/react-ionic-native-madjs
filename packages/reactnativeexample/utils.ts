import characters from './characters.json';
import { Character } from './types.js';

export const getCharacterData = (): Character[] => {
  console.log(characters);
  
  return (characters.characters as any[])
    .filter(character =>
      character.characterName &&
      character.characterImageThumb != null &&
      character.characterImageFull != null)
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