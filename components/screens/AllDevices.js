import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Button, Alert} from 'react-native';
import {Buffer} from 'buffer';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import { catchClause } from '@babel/types';
import SingleDeviceComponent from './SingleUIComponents/SingleDeviceComponent';

export default class AllDevices extends Component {

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
            deviceArray: [
                {'name':'Longer Pump Name', 'sensors':'9', 'sensorsData':[{'name':'Sensor A6','level':'200'},{'name':'Sensor A5','level':'185'}]},
                {'name':'Longer Pump Name 2', 'sensors':'7', 'sensorsData':[{'name':'Sensor A7','level':'200'},{'name':'Sensor A6','level':'185'}]},
            ]
        }

    }


    render() {
        let devices = this.state.deviceArray.map((val, key)=>{
            return <SingleDeviceComponent key={key} keyVal={key} val={val} showDevice={()=> this.showDevice(key)} />
        });
        return (
          <View style={styles.container}>
            
            <View style={styles.body}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>5 pumps found in range</Text>
                    
                <ScrollView style={{flex:1}}>
                    {devices}
                </ScrollView>
            </View>
          </View>

        );
    }

    showDevice(key){
      let device = this.state.deviceArray[key];

      this.props.navigation.navigate('Sensor',{
        'device':device
      });
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f1f1f1',
      alignItems: 'center',
      padding:20,
      flex:1,
      flexDirection:'row'
    },
    body:{
        flex: 1,
        flexDirection:'column',
    },
    heading:{
        fontSize: 28,
        color: '#333',
        alignItems: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',

    }
   
  });
 
