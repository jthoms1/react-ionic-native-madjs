import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import { matchCharacterName, getCharacterData } from './utils';
import { Character } from './types';

type Props = {
  navigation: any
};
type State = {
  searchText: string;
  characterList: Character[]
}

export default class CharacterList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
      characterList: getCharacterData()
    };
  }

  setSearchText = (e: CustomEvent) => {
    this.setState((prevState) => ({
      ...prevState,
      searchText: e.detail.value
    }));
  }

  _onPressButton = (characterId: number) => {
    this.props.navigation.navigate('Details', { characterId: characterId });
  }

  render() {
    return (
      <View>
        <FlatList<Character>
          data={this.state.characterList
              .filter(matchCharacterName(this.state.searchText))
              .map(c => ({
                key: `${c.id}`,
                ...c
              }))
          }
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this._onPressButton(item.id)}>
              <View style={styles.rowContainer}>
                <Image source={{ uri: item.characterImageThumb }} style={styles.image} />
                <Text style={styles.itemText}>{item.characterName}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  itemText: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    flex: 0,
    width: 40,
    height: 40,
    borderRadius: 20
  }
})