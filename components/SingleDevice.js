import React, {Component} from 'react';
import {StyleSheet, Text, View,  TouchableOpacity, Button, Alert} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { ScrollView } from 'react-native-gesture-handler';
import {Buffer} from 'buffer';


export default class SingleDevice extends Component {

    static navigationOptions = {
        title: 'Sensor Details',
      };

    constructor(props){
        super(props)

        this.state = {
            device: this.props.navigation.state.params.device,
            manager: this.props.navigation.state.params.manager,
            serviceUuid: this.props.navigation.state.params.serviceUuid,
            readUuid: this.props.navigation.state.params.readUuid,
            info: "",
            values: {},
            textValue:{value: 0}
        }

        this.device = this.state.device
        this.serviceUUIDs = this.state.serviceUuid
        this.readUUIDs = this.state.readUuid
        
        this.manager = this.state.manager
        
        this.device.connect()
            .then((device) => {
                this.info("Discovering services and characteristics");
                return device.discoverAllServicesAndCharacteristics();
            })
            .then((device) => {
                this.info("Setting notifications");
                return this.setupNotifications(device);
            })
            .then(() => {
                this.info("Listening...");
            }, (error) => {
                this.error(error.message);
            });

    }


    render() {
        return (
            <View style={styles.container}>
            <View style={styles.topHeading}>
              <Text style={styles.topHeadingText}>Sensor Name: {this.state.device.name} </Text>
            </View>


            <View style={styles.table}>
              <View style={styles.column}>
                <Text style={styles.columnHeading}>Site Name:</Text>
                <Text style={styles.columnHeading}>Pump Serial Number:</Text>
                <Text style={styles.columnHeading}>Pump Name:</Text>
                <Text style={styles.columnHeading}>Sensor Position:</Text>
                <Text style={styles.columnHeading}>Material:</Text>
                <Text style={styles.columnHeading}>Initial Measured Thickness:</Text>
                <Text style={styles.columnHeading}>Error/Fault</Text>
              </View>
    
              <View  style={styles.column}>
                <Text style={styles.columnValue}>Newcrest Cadia</Text>
                <Text style={styles.columnValue}>PW12345678</Text>
                <Text style={styles.columnValue}>MCR55OUDC</Text>
                <Text style={styles.columnValue}>DIS-001</Text>
                <Text style={styles.columnValue}>A61</Text>
                <Text style={styles.columnValue}>110mm, 29.12.18, 14:15</Text>
                <Text style={styles.columnValue}>N/A</Text>
              </View>
            </View>

            <Button style={styles.fetchButton} title="Fetch Data" onPress={() => {
                Alert.alert('Value is '+this.state.textValue.value);
            }}></Button>
            
          </View>

        );
    }


    serviceUUID() {
        return this.serviceUUIDs;
    }
  
    notifyUUID() {
        return this.readUUIDs;
    }
  
    writeUUID() {
        return this.readUUIDs;
    }
  
    info(message) {
        this.state.info = this.state.info +'\n'+message;
        this.setState({info: this.state.info})
    }
  
    error(message) {
        this.state.info = this.state.info +'\n ERROR '+message;
        this.setState({info: this.state.info})
    }
  
    updateValue(key, value) {
        textValue=Buffer.from(value, 'base64').toString('ascii');
        this.state.textValue = JSON.parse(textValue);
        this.setState({textValue: this.state.textValue})
        this.setState({info: this.state.info+'\n-> key: '+key+' , value: '+ Buffer.from(value, 'base64').toString('ascii') });
        this.setState({values: {...this.state.values, [key]: value}})
    }

    
  async setupNotifications(device) {
    const service = this.serviceUUID();
    const characteristicW = this.writeUUID();
    const characteristicN = this.notifyUUID();

    this.info('Service :-> '+service);
    this.info('ChWrite:=> '+characteristicW)
    this.info('ChNotify:=> '+characteristicN)

    const characteristic = await device.writeCharacteristicWithResponseForService(
        service, characteristicW, "" /* 0x01 in hex */
    );

    device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
        if (error) {
            this.error(error.message)
            return
        }
        this.updateValue(characteristic.uuid, characteristic.value)
    })
  }


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding:10
    },
    topHeading:{
      padding: 10,
      borderWidth:2,
      borderColor: '#ff0000',
      alignSelf: 'stretch',
      borderRadius: 5
    },
    topHeadingText:{
      textAlign:'center'
    },
    table:{
      flex:1,
      flexDirection:'row',
      padding:10
    },
    column:{
      flex:1,
      flexDirection:'column'
    },
    columnHeading:{
      color: 'blue',
      margin:5
    },
    columnValue:{
      margin: 5
    },
    fetchButton:{
      flex:1,
      width: 120
    }
   
  });
 
