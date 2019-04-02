import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { getCharacterData } from './utils';
import { Character } from './types';

type State = {
  characterId: number,
  character: Character | undefined
}
type Props = {
  characterId: number,
  navigation: any
};


class CharacterList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const characterId: number = props.navigation.getParam('characterId', 0);
    this.state = {
      characterId,
      character: getCharacterData().find(character => (character.id === characterId))
    };
  }

  setSearchText = (e: CustomEvent) => {
    this.setState((prevState) => ({
      ...prevState,
      searchText: e.detail.value
    }));
  }

  render() {
    return (
      <View>
        { (this.state.character) ?
        <Text>{this.state.character.characterName}</Text> :
        <Text>No character found with id of ${this.state.characterId}</Text>
        }
      </View>
    );
  }
}

export default CharacterList;
