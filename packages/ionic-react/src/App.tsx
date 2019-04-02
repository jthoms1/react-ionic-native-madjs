import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonPage } from '@ionic/react';
import './App.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import CharacterList from './CharacterList';
import CharacterDetails from './CharacterDetails';

class App extends Component {
  render() {
    return (
      <IonApp>
        <Router>
          <IonPage>
            <IonRouterOutlet>
              <Route path="/" exact={true} render={() => <Redirect to="/characters"/>} />
              <Route path="/:tab(characters)" component={CharacterList} exact={true} />
              <Route path="/:tab(characters)/:characterId" component={CharacterDetails} />
            </IonRouterOutlet>
          </IonPage>
        </Router>
      </IonApp>
    );
  }
}

export default App;
