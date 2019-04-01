import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
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
          <IonRouterOutlet>
            <Route path="/" exact={true} render={() => <Redirect to="/characters"/>} />
            <Route path="/:tab(characters)" component={CharacterList} exact={true} />
            <Route path="/:tab(characters)/:characterId" component={CharacterDetails} />
          </IonRouterOutlet>
        </Router>
      </IonApp>
    );
  }
}

export default App;
