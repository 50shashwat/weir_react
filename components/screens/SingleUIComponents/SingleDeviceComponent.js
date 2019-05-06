/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,  TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SingleDeviceComponent extends Component {

    render() {
        return (
            <View style={{backgroundColor:'#f1f1f1'}}>
            <View style={styles.card} key={this.props.keyval}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Text style={styles.heading}>{this.props.val.name}</Text>
                    <Icon style={styles.icon} name="battery-1" color="#ff0000" />

                </View>
                <View style={{flex:1, flexDirection:'row',marginTop:5}}>
                    <Text style={styles.sensorName}> {this.props.val.sensorsData[0].name} {this.props.val.level}% RUL</Text>
                    
                    <TouchableOpacity onPress={this.props.showDevice}> 
                        <Text style={styles.button}>9 Sensors</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    card:{
        margin:5,
        position: 'relative',
        padding: 10,
        borderWidth: 2,
        borderColor: '#ededed',
        backgroundColor:'#fff',
        flexDirection:'column',
        height:80,
        borderRadius:4
    },
    heading:{
        fontSize:16,
        fontWeight:'bold',
        flex:1
    },
    icon:{
        fontSize:20,
        textAlign:'right',
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        flexDirection:'row',
        position:'absolute',
        right:0
    },
    sensorName:{
        color: 'orange',
        flex:1
    },
    button:{
        borderColor:'#005EB8',
        borderWidth:1,
        backgroundColor:'#fff',
        color:'#005EB8',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:3,
        paddingBottom:3,
        borderRadius:15,
        justifyContent:'flex-end',
    },
    deviceConnectText:{
        color: 'white'
    }

});
