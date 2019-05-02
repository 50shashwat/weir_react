import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/HomeScreen'
import SingleDevice from './components/SingleDevice'

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}


const AppStackNavigator =  createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  SingleDevice: {
    screen: SingleDevice
  }
})

const AppContainer = createAppContainer(AppStackNavigator);
