import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, StyleSheet} from 'react-native';
import color from '../color/mainColor';
import LottieView from "lottie-react-native";
import axios from '../config/axios';
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";


const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function LoginScreen (props) {

    //vairabiles...

    const [userName, setUsername]  = useState('');
    const [password, setPassword]  = useState('');
    const [permission, setPermission]  = useState('');



   
        


    const _register = () => {
        (async () => {

            try{

                const user = await axios.post('/add', {
                    userName,
                    password,
                    permission
                })

            }catch(e){
                console.log(e);
            }

        })();
    }

    const _login = () => {
        (async () => {

            try{

                const user = await axios.post('/login', {
                    userName,
                    password,
                });

                AsyncStorage.setItem('token', user.data.token);
                AsyncStorage.setItem('class', user.data.class);

                console.log(user.data.class);

                AsyncStorage.setItem('check', 'kgo');

                console.log(await AsyncStorage.getItem('token'));
                console.log(await AsyncStorage.getItem('class'));

                AsyncStorage.setItem('userId', `${userName}`);
                AsyncStorage.setItem('password', `${password}`);


                if (user){
                    props.navigation.navigate('Home')
                    if (userName === 'Driver1'){
                        props.navigation.navigate('BusTimeSystem');
                        AsyncStorage.setItem('check' , 'Kgo')
                    }
                }

                if (user.data.permission === 'True'){
                    props.navigation.navigate('HomeWork');
                    AsyncStorage.setItem('check' , 'true')
                }

                

            }catch(e){
                console.log(e);
            }

        })();
    }


    return(
        <View style={{backgroundColor: color.blue, width: screenWidht, height: screenHeight}}>
        

            <LottieView 
                source={require('../assets/animation_lmnmn2jr.json')}
                autoPlay
                loop
                style={{width: screenWidht, height:screenHeight * 0.33, marginTop: 59, marginLeft: 9}}
            />

            <Text style={{color: color.white, fontWeight: 'bold', fontSize: 15, marginTop: 70, marginLeft: 15, borderWidth: 1, borderColor: color.white, borderRadius: 7, padding: 7, width: screenWidht * 0.5}}
            onPress={() => {if (userName === 'Admin' && password === 'kgo') {props.navigation.navigate('Register'); } }}>put your correct mail !!!</Text>

            <Input 
                placeHolder="userName"
                onChangeText={(text) => setUsername(text)}
                value={userName}
                inputStyles={{
                    marginTop: 50,
                    fontSize:18,
                    textAlign: 'left'
                }}
            />

            <Input 
                placeHolder="password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
                inputStyles={{
                    marginTop: 7,
                    fontSize:18,
                    textAlign: 'left'
                }}
            />

            

            <TouchableOpacity onPress={() => {_login(); }}>
                <View style={{backgroundColor: color.white, padding: 7, borderRadius: 30, width: screenWidht * 0.7, alignItems: 'center', alignSelf: 'center',marginTop: screenHeight * 0.1}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.blue}}>Submit</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default LoginScreen;