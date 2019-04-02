import React, { Component } from 'react';
import { IonPage, IonHeader, IonToolbar, IonSearchbar, IonContent, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Character } from './types';
import { matchCharacterName, getCharacterData } from './utils';
import './App.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

type Props = RouteComponentProps<{}>;
type State = {
  searchText: string;
  characterList: Character[]
}

class CharacterList extends Component<Props, State> {
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

  navigateToSession = (characterId: number) => {
    this.props.history.push(`/characters/${characterId}`);
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar color="transparent">
            <IonSearchbar
                placeholder="Search"
                onIonChange={this.setSearchText}
            >
            </IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {this.state.characterList
              .filter(matchCharacterName(this.state.searchText))
              .map((character, index) => (
                <IonItem key={index} onClick={() => this.navigateToSession(character.id)}>
                  <IonAvatar slot="start">
                    <img src={character.characterImageThumb} />
                  </IonAvatar>
                  <IonLabel>{character.characterName}</IonLabel>
                </IonItem>
              ))}
          </IonList>
        </IonContent>
      </>
    );
  }
}

export default withRouter(CharacterList);
