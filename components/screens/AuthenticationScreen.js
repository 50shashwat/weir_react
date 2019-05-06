import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Button, Alert} from 'react-native';
import {Buffer} from 'buffer';
import { TextInput } from 'react-native-gesture-handler';


export default class AuthenticationScreen extends Component {

    static navigationOptions = {
        headerTitle: (
            <Image source={require('../../images/logo__small.png')} style={
                {width:200, height: 50}
            }/>
        ),
        headerStyle: {
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


    render() {
        return (
          <View style={styles.container}>
           <ImageBackground source={require('../../images/pump_background.jpg')} style={{flex:1}}>
            <View style={styles.body}>
                <Text style={styles.heading}>Wear Monitor</Text>
                <View style={styles.card}>
                    <Text style={{alignItems:"center"}}>A unique code has been sent to your Weir companu email address. Please enter the code below</Text>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Security Code" ></TextInput>
                    <Button style={styles.button} title="Authenticate" onPress={()=>this.props.navigation.navigate('AccountSetup')}></Button>
                </View>
            </View>
           </ImageBackground>
            
          </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center'
    },
    body:{
        flex:1,
        alignItems: 'center',
        flexWrap:'wrap',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    heading:{
        fontSize: 36,
        color: '#fff',
        alignItems: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',

    },
    card:{
        backgroundColor: '#fff',
        padding: 10,
        width:350,
        margin: 10
    },
    button:{
        margin: 20
    },
    input:{
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        margin: 10,
        padding: 5
    },
    text:{
        margin: 20
    }
   
  });
 
