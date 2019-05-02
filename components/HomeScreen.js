import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { BleManager } from 'react-native-ble-plx';
import  Device  from './Device';


import Icon from 'react-native-vector-icons/FontAwesome';


//Permission Manager for location
export async function request_location_runtime_permission() {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'ReactNativeCode Location Permission',
          'message': 'ReactNativeCode App needs access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location Permission Granted.");
      }
      else {
  
        console.log("Location Permission Not Granted");
  
      }
    } catch (err) {
      console.warn(err)
    } 
  }



//Popup for enabling Location to scan nearest bluetooth device
RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
  .then(data => {
    console.log(data)
  }).catch(err => {
    console.log(err)
  });

//popup for bluetooth enabling
BluetoothStateManager.getState().then(bluetoothState => {
  switch (bluetoothState) {
    case 'Unknown':
    break;
    case 'Resetting':
    break;
    case 'Unsupported':
    break;
    case 'Unauthorized':
    console.log('No Permission for accessing bluetooth')
    break;
    case 'PoweredOff':
    console.log('Bluetooth is turned off, please enable it')
    BluetoothStateManager.requestToEnable().then(result => {
      if(!result){
        console.log('Bluetooth Is Essential to run this app')
      }

    });
    break;

    case 'PoweredOn':

    break;
    default:
      break;
  }
});

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Weir App',
  };

    async componentDidMount() {
        await request_location_runtime_permission()      
    }
    

    constructor(){
      super();

      this.state = {
          deviceArray:[],
          device:'',
          info: "",
          values: {},
          timer: null,
          counter: 0,
          timePassed: false
  
      };

      this.manager = new BleManager();
      this.serviceUUIDs = "000000ee-0000-1000-8000-00805f9b34fb";
      this.readUUIDs = "0000ee01-0000-1000-8000-00805f9b34fb";


      }

    render() {
      let devices = this.state.deviceArray.map((val, key)=>{
        return <Device key={key} keyVal={key} val={val}
                     connectMethod={()=> this.connectDevice(key)} />
    });

      return (
        <View style={styles.container}>
        
        <ScrollView style={styles.scrollContainer}>
            {devices}
        </ScrollView>

        <TouchableOpacity onPress={this.searchDevice.bind(this)} style={styles.addButton}>
            <Text style={styles.addButtonText}> <Icon name="search" size={30} color="#fff" /></Text>
        </TouchableOpacity>
        </View>
      );
    }

    //BLE related code
    connectDevice(key){
      let device = this.state.deviceArray[key].deviceData;
      console.log('opening device '+device.name);

      this.props.navigation.navigate('SingleDevice',{
        'device':device,
        'manager': this.manager,
        'serviceUuid':this.serviceUUIDs,
        'readUuid':this.readUUIDs
      });

  }

  searchDevice(){
    if (Platform.OS === 'ios') {
      this.manager.onStateChange((state) => {
          if (state === 'PoweredOn') this.scanAndConnect()
      })
    } else {
        this.scanAndConnect()
    }
    setTimeout( () => {
        this.manager.stopDeviceScan();
    },5000);

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
      this.setState({info: message})
  }

  error(message) {
      this.setState({info: "ERROR: " + message})
  }

  updateValue(key, value) {
      this.setState({values: {...this.state.values, [key]: value}})
  }

  scanAndConnect() {
    let self = this;

    this.manager.startDeviceScan(null,
        null, (error, device) => {
            this.info("Scanning...");

            if (device) {
               let skip = false;

                if (!skip) {
                    self.state.deviceArray.push({
                        'device': device.name,
                        'deviceData': device
                    });
                    self.setState({'deviceArray': this.state.deviceArray});
                }
            }


            console.log(device);

            if (error) {
                this.error(error.message);
                return
            }


            
        });

  }

  async setupNotifications(device) {
    const service = this.serviceUUID();
    const characteristicW = this.writeUUID();
    const characteristicN = this.notifyUUID();

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
      flex:1
  },
  header:{
      backgroundColor: '#E91E63',
      borderBottomWidth: 10,
      borderBottomColor: '#ddd'
  },
  headerText:{
      color: 'white',
      fontSize:18,
      padding: 15
  },
  scrollContainer:{
      flex: 1,
      marginBottom: 100,
  },
  footer:{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
  },
  textInput:{
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      backgroundColor: '#252525',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
  },
  addButton:{
      position: 'absolute',
      zIndex:11,
      right: 20,
      bottom: 90,
      backgroundColor:'#E91E63',
      width: 90,
      height: 90,
      borderRadius:50,
      alignItems: 'center',
      justifyContent:'center',
      elevation: 8,
  },
  addButtonText:{
      color: '#fff',
      fontSize: 24
  }

});

