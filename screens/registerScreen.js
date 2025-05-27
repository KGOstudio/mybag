import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, StyleSheet} from 'react-native';
import color from '../color/mainColor';
import LottieView from "lottie-react-native";
import axios from '../config/axios';
import Input from "../components/Input";


const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function Register (props) {

    //vairabiles...

    const [userName, setUsername]  = useState('');
    const [password, setPassword]  = useState('');
    const [permission, setPermission]  = useState('');
    const [class1, setClass] = useState('');


   
        


    const _register = () => {
        (async () => {

            try{

                const user = await axios.post('/add', {
                    userName,
                    password,
                    class1,
                    permission
                })

            }catch(e){
                console.log(e);
            }

        })();
    }

  


    return(
        <View style={{backgroundColor: color.blue, width: screenWidht, height: screenHeight}}>
        

            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 30, width:screenWidht * 0.1,marginTop: 100,marginLeft: 70,textAlign: 'center', shadowColor: color.white,shadowRadius: 3,shadowOpacity: 1, color: color.white}} 
                    onPress={() => {setUsername('');}}>1</Text>

                <Text style={{fontSize: 30, width:screenWidht * 0.1,marginTop: 100,marginLeft: 70,textAlign: 'center', shadowColor: color.white,shadowRadius: 3,shadowOpacity: 1, color: color.white}} 
                    onPress={() => {setPassword('');}}>2</Text>

                <Text style={{fontSize: 30, width:screenWidht * 0.1,marginTop: 100,marginLeft: 70,textAlign: 'center', shadowColor: color.white,shadowRadius: 3,shadowOpacity: 1, color: color.white}} 
                    onPress={() => {setPermission('');}}>3</Text>
            </View>
           

            
            <Input 
                placeHolder="userName"
                onChangeText={(text) => setUsername(text)}
                value={userName}
                inputStyles={{
                    marginTop: 110,
                    fontSize:18,
                    textAlign: 'left'
                }}
            />

            <Input 
                placeHolder="password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                inputStyles={{
                    marginTop: 7,
                    fontSize:18,
                    textAlign: 'left'
                }}
            />

            <Input 
                placeHolder="class"
                onChangeText={(text) => setClass(text)}
                value={class1}
                inputStyles={{
                    marginTop: 7,
                    fontSize:18,
                    textAlign: 'left'
                }}
            />

            <Input 
                placeHolder="permission"
                
                onChangeText={(text) => setPermission(text)}
                value={permission}
                inputStyles={{
                    marginTop: 7,
                    fontSize:18,
                    textAlign: 'left'
                }}
            />

            

            <TouchableOpacity onPress={() => {_register(); }}>
                <View style={{backgroundColor: color.white, padding: 7, borderRadius: 30, width: screenWidht * 0.7, alignItems: 'center', alignSelf: 'center',marginTop: screenHeight * 0.1}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.blue}}>Submit</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default Register;