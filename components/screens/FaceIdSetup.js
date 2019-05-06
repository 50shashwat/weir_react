import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Button, Alert} from 'react-native';
import {Buffer} from 'buffer';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions, NavigationActions } from 'react-navigation';


export default class FaceIdSetup extends Component {

    static navigationOptions = {
        headerTitle: (
            <Image source={require('../../images/logo_small_light.png')} style={
                {width:200, height: 50}
            }/>
        ),
        headerStyle: {
            backgroundColor:'#005EB8'
        },
        headerTitleStyle: {
            color: 'white'
        },
        tintColor:{
            color: 'white'
        }
      };

    constructor(props){
        super(props)

        this.state = {
            
        }

    }

         
    storeData(key,value){ try {
        AsyncStorage.setItem(key, value);
       } catch (error) {
           console.log(error)
       }
    }

    getData(key){ try {
            const value =  AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {console.log(error)}
    }

    render() {
        return (
          <View style={styles.container}>
            
                <Text style={styles.heading}>Account Setup</Text>
                <Text style={{ textAlign:'center',padding:20}}>Confirm or setup Touch / Face ID</Text>
                <View  style={{flex:5}} ></View>
                <Button onPress={this.savePin.bind(this)} style={{backgroundColor:'#005EB8'}} title="Continue">
                </Button>
            
          </View>

        );
    }

    savePin(){
        this.storeData('pin','123456');
        
        const resetAction = StackActions.reset({
        index: 0,
        actions: [
        NavigationActions.navigate({ routeName: 'Pin' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'#f1f1f1',
      flex: 1,
      flexDirection:'column',
      padding:20
    },
    heading:{
        fontSize: 24,
        color: '#333',
        alignItems: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textAlign:'center'

    },
    text:{
        margin: 20
    }
   
  });
 
