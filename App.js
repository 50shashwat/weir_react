import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/HomeScreen'
import SingleDevice from './components/SingleDevice'
import LoginScreen from './components/screens/LoginScreen';
import AuthenticationScreen from './components/screens/AuthenticationScreen';
import AccountSetup from './components/screens/AccountSetup'
import FaceIdSetup from './components/screens/FaceIdSetup';
import ForgetPassword from './components/screens/ForgetPassword';
import PinLogin from './components/screens/PinLogin';
import SingleDeviceComponent from './components/screens/SingleUIComponents/SingleDeviceComponent';
import AllDevices from './components/screens/AllDevices';
import AccountSetupConfirm from './components/screens/AccountSetupConfirm';
import Sensor from './components/screens/Sensor';

export default class App extends Component {
  constructor(){
    super();
    global.rootUrl = 'http://bleapp.akscellenceinfo.com/';
  }

  render() {
    return (
      <AppContainer />
    );
  }
}


const AppStackNavigator =  createStackNavigator({
  
  Login: {
    screen: LoginScreen
  },
  Devices:{
    screen:AllDevices
  },
  Sensor:{
    screen: Sensor
  },
  Pin:{
    screen: PinLogin
  },
  Auth:{
    screen: AuthenticationScreen
  },
  AccountSetup: {
    screen: AccountSetup
  },
  AccountSetupConfirm:{
    screen: AccountSetupConfirm
  },
  FaceId:{
    screen: FaceIdSetup
  },
  Forget:{
    screen: ForgetPassword
  },
  Home: {
    screen: HomeScreen
  },
  SingleDevice: {
    screen: SingleDevice
  }
})

const AppContainer = createAppContainer(AppStackNavigator);
