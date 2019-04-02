/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import CharacterList from './CharacterList';
import CharacterDetails from './CharacterDetails';


const MainNavigator = createStackNavigator({
  Home: {screen: CharacterList},
  Details: {screen: CharacterDetails},
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}