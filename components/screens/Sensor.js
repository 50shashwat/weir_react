import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Button, Alert} from 'react-native';
import {Buffer} from 'buffer';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import { catchClause } from '@babel/types';
import SingleDeviceComponent from './SingleUIComponents/SingleDeviceComponent';

export default class Sensor extends Component {

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
            //
            //this.props.navigation.state.params.device
        imageUrl = [
                {
                uri: require('../../images/image_1.png')
                },{
                    uri: require('../../images/image_2.png')
                }
            ];
        selectedIndex = 0;
        this.state = {
            device: {'name':'Longer Pump Name', 'sensors':'9', 'sensorsData':[{'name':'Sensor A6','level':'200'},{'name':'Sensor A5','level':'185'}]},
            textValue:{value: 0},
            image: imageUrl[selectedIndex].uri,
        }

    }


    render() {
        
        var _tabButton, _tabButton2;
        var _tabText, _tabText2;

        if (this.selectedIndex==0){ 
         _tabButton = styles.activeTab;
         _tabButton2 = styles.inactiveTab
         _tabText = styles.activeTabText;
         _tabText2 = styles.inactiveTabText;
        }
        else{ // default button style
         _tabButton = styles.inactiveTab
         _tabButton2 = styles.activeTab
         _tabText = styles.inactiveTabText;
         _tabText2 = styles.activeTabText;
        }
        

        return (
          <View style={styles.container}>
            
            <View style={styles.body}>
                <Text style={{ fontWeight:'bold',fontSize: 18}}>{this.state.device.name}</Text>
                <ScrollView style={{flex:1}}>
                    <Image source={this.state.image} style={styles.imageContainer} />
                    <View style={styles.tabContainer}>
                        <TouchableOpacity style={_tabButton} onPress={()=> this.selectedIndex=0}>
                            <Text style={_tabText}>3 Volute 2 Throatbush</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={_tabButton2}  onPress={()=> this.selectedIndex=1}>
                            <Text style={_tabText2}>2 Frame Plate Liner</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
          </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
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

    },
    imageContainer:{
        alignItems:'center',
        flex: 1
    },
    tabContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    activeTab:{
        backgroundColor:'#005eb7',
        padding:10
    },
    inactiveTab:{
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor:'#333',
        padding:10
    },
    activeTabText:{
        color: '#fff'
    },
    inactiveTabText:{
        color: '#333'
    }
    
   
  });
 
