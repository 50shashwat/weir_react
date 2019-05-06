import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Button, Alert} from 'react-native';
import {Buffer} from 'buffer';
import { TextInput } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ForgetPassword extends Component {

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


    render() {
        return (
          <View style={styles.container}>
            
                <Text style={styles.heading}>Forgotten Password</Text>
                <Text style={{ textAlign:'center',padding:20}}>
                    If your password is lost or forgotten, you will need to request a password reset from the Admin
                </Text>
                <Text style={{ textAlign:'center',padding:20}}>
                    Please enter your email address below and click Reset    
                </Text>
                <TextInput style={styles.input}  placeholder='Email Address' ></TextInput>

                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')}>
                    <Text style={{textAlign:'center'}}>Authenticate</Text>
                </TouchableOpacity>
            
          </View>

        );
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
    },
    input:{
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        margin: 20,
        padding: 5,
        width:300,
        backgroundColor:'#fff'
    },
    button:{
        width:300,
        margin: 20,
        borderRadius:2,
        backgroundColor:'#ccc',
        borderColor:'#999',
        color: '#222',
        padding: 10,
        textAlign:'center',
        justifyContent:'center'
    },
   
  });
 
