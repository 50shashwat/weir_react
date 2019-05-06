import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, Button, Alert, AsyncStorage} from 'react-native';
import {Buffer} from 'buffer';
import { TextInput } from 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation';  


export default class LoginScreen extends Component {

    static navigationOptions = {
        headerTitle: (
            <Image source={require('../../images/logo__small.png')} style={
                {width:200, height: 50}
            }/>
        ),
        headerStyle: {
        }
      };

      
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

    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
            log:''
        }

    }

    componentDidMount(){
        

        if(this.getData('token')!=''){
            if(this.getData('pin')!=''){
                this.props.navigation.replace('Pin')
            }else{
                this.props.navigation.replace('AccountSetup')
            }
        }
    }

    render() {
        return (
          <View style={styles.container}>
           <ImageBackground source={require('../../images/pump_background.jpg')} style={{flex:1}}>
            <View style={styles.body}>
                <Text style={styles.heading}>Wear Monitor</Text>
                <View style={styles.card}>
                    <TextInput style={styles.input} placeholder="Username" onChangeText={(username) => this.setState({username})} ></TextInput>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={(password) => this.setState({password})}></TextInput>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Forget')}>
                    <Text style={styles.text} >Forget Password</Text>
                    </TouchableOpacity>
                    <Button style={styles.button} title="Login" onPress={this.loginMethod.bind(this)}></Button>
                    <Text>{this.state.log}</Text>
                </View>
            </View>
           </ImageBackground>
            
          </View>

        );
    }



    
    loginMethod(){
        
        loginThis = this;
        url = global.rootUrl+'login';
        
        fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        }),
        })
        .then((response)=>response.json()).then((responseJson)=>
        {
            if(responseJson.Token){
                this.storeData('token',responseJson.Token);
                this.props.navigation.navigate('Auth');
            }else{
                this.setState({log: 'Invalid Password'})
            }
        });
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
        margin: 10,
        borderRadius:4
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
 
