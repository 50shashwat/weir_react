import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Button, Alert} from 'react-native';
import {Buffer} from 'buffer';
import { TextInput } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import { catchClause } from '@babel/types';

export default class AccountSetupConfirm extends Component {

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
            
            <View style={styles.body}>
                <Text style={styles.heading}>Account Setup</Text>
                <Text style={{ textAlign:'center',padding:40}}>Please confirm your PIN</Text>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={styles.singleText}></View>
                    <View style={styles.singleText}></View>
                    <View style={styles.singleText}></View>
                    <View style={styles.singleText}></View>
                    <View style={styles.singleText}></View>
                    <View style={styles.singleText}></View>
                </View>
                <View style={styles.card}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity style={styles.numberButton}><Text >1</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text >2</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text >3</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity style={styles.numberButton}><Text >4</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text >5</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text >6</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity style={styles.numberButton}><Text >7</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text >8</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text >9</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <TouchableOpacity style={styles.numberButton}><Text ></Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text >0</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.numberButton}><Text ><Icon name="md-backspace"  color="#333" /></Text></TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('FaceId')}>
                    <Text style={{textAlign:'center'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
            
          </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f1f1f1',
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      padding:20
    },
    body:{
        flex:1,
        alignItems: 'center',
        flexWrap:'wrap',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    heading:{
        fontSize: 28,
        color: '#333',
        alignItems: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',

    },
    numberButton:{
        borderColor: '#ccc',
        borderWidth: 1,
        padding:15,
        justifyContent:'center',
        flex:1,
        textAlign:'center',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    singleText:{
        marginRight:15,
        fontSize: 38,
        width:15,
        height:15, 
        backgroundColor:'#999',
        borderRadius:10
    },
    singleTextPassed:{
        marginRight:15,
        fontSize: 38,
        width:20,
        height:20, 
        backgroundColor:'#333',
        borderRadius:10
    },
    card:{
        backgroundColor: '#fff',
        width:200,
        margin: 10,
        flexDirection:'column',
        flex:4
    },
    button:{
        margin: 20,
        width:200,
        backgroundColor:'#ccc',
        borderColor:'#999',
        color: '#222',
        padding: 10,
        textAlign:'center',
        justifyContent:'center'
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
 
