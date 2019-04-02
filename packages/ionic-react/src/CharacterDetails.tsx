import React, { Component } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Character } from './types';
import { getCharacterData } from './utils';

type Props = RouteComponentProps<{ characterId: string }> & {
  goBack: () => void;
};
type State = {
  character: Character | undefined
}


function matchCharacterName(searchText: string) {
  return (character: Character) => {
    if (character.characterImageThumb == null) {
      return false;
    }
    if (searchText === '') {
      return true;
    }
    const regex = new RegExp(searchText,'gi');
    return !!character.characterName.match(regex);
  };
}


class CharacterList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      character: getCharacterData().find(character => (character.id === parseInt(props.match.params.characterId)))
    };
    if (this.state.character) {
      console.log(this.state.character.characterImageFull);
    }
  }

  setSearchText = (e: CustomEvent) => {
    this.setState((prevState) => ({
      ...prevState,
      searchText: e.detail.value
    }));
  }

  navigateToSession = (characterId: number) => {
    this.props.history.push(`/${characterId}`);
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar color="transparent">
            <IonButtons slot="start">
              <IonBackButton goBack={this.props.goBack} defaultHref={`/characters`} />
            </IonButtons>
            <IonTitle>Character Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.state.character == null ? 
          <IonCard>
            <IonCardContent>
              No character found with id of ${this.props.match.params.characterId}.
            </IonCardContent>
          </IonCard> :
          <IonCard>
            <img src={this.state.character.characterImageFull} />
            <IonCardHeader>
              <IonCardTitle>{this.state.character.characterName}</IonCardTitle>
              <IonCardSubtitle>House {this.state.character.houseName}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              {this.state.character.killed.length > 0 ?
                <p><b>Killed</b> {this.state.character.killed.join(', ')}</p> :
                ''
              }
              {this.state.character.killedBy.length > 0 ?
                <p><b>Killed by</b> {this.state.character.killedBy.join(', ')}</p> :
                ''
              }
            </IonCardContent>
          </IonCard>
          }
        </IonContent>
      </>
    );
  }
}

export default withRouter(CharacterList);
