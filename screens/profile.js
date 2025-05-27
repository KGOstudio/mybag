import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, StyleSheet, ScrollView, Image} from 'react-native';
import color from '../color/mainColor';
import LottieView from "lottie-react-native";
import axios from '../config/axios';
import Input from "../components/Input";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";



const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function Profile (props) {

    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [class1, setClass] = useState('');
    const [key, setKey] = useState('');

    const [aniSign,setAniSign] = useState(false);

    const [editPage, setEdPag] = useState(false);
    const [editPage1, setEdPag1q] = useState(false);


    const _editUsername = () => {
        (async () => {

            try{

                const editUsername = await axios.post('/editUserName', {
                    key,
                    userName
                })

            }catch(e){
                console.log(e);
            }

        })();
    }

    const _editPassword = () => {
        (async () => {

            try{

                const editUsername = await axios.post('/editPassword', {
                    key,
                    password
                })

            }catch(e){
                console.log(e);
            }

        })();
    }


    return (
        <ImageBackground source={require('../images/backHomescreen.jpg')} style={{width:screenWidht, height:screenHeight}} onLayout={async() => {
            setuserName(await AsyncStorage.getItem('userId'));
            setPassword(await AsyncStorage.getItem('password'))
            setClass(await AsyncStorage.getItem('class'));

            setKey(await AsyncStorage.getItem('userId'));

        }}>

            <Text style={{fontSize: 50, fontWeight: 'bold', marginTop: 59, marginLeft: 7, padding: 1, color: color.white}}>Profile</Text>

            <View style={{borderBottomColor: color.white, borderBottomWidth: 3, width: screenWidht * 0.7,alignSelf: 'center', padding: 15,alignItems: 'center',flexDirection:'row'}}>
                <TouchableOpacity onPress={() => {setEdPag(true); }}>
                    <Image source={require('../images/pen.png')} style={{width: 30,height: 30}} />
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: color.white, marginTop: 70, }}>userName: {userName}</Text>
            </View>

            <View style={{borderBottomColor: color.white, borderBottomWidth: 3, width: screenWidht * 0.7,alignSelf: 'center', padding: 15,alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {setEdPag1q(true); }}>
                    <Image source={require('../images/pen.png')} style={{width: 30,height: 30}} />
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: color.white, marginTop: 70, }}>password: {password}</Text>
            </View>

            <View style={{borderBottomColor: color.white, borderBottomWidth: 3, width: screenWidht * 0.7,alignSelf: 'center', padding: 15,alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: color.white, marginTop: 70, }}>class: {class1}</Text>
            </View>


            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('Home'); }}>
                    <View style={{backgroundColor: color.white, padding: 7,width:screenWidht * 0.35, borderRadius: 7,alignItems: 'center',marginTop: 70, marginLeft: 30}}>
                        <Text style={{fontSize: 30,fontWeight: 'bold', color: color.blue}}>close</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setAniSign(true); setTimeout(() => {setAniSign(false); AsyncStorage.setItem('check', ''); props.navigation.navigate('WelcomeScr'); },2700)}}>
                    <View style={{backgroundColor: 'red', padding: 7,width:screenWidht * 0.35, borderRadius: 7,alignItems: 'center',marginTop: 70, marginLeft: 30}}>
                        <Text style={{fontSize: 30,fontWeight: 'bold', color: color.white}}>sign out</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {aniSign && (
                <View style={{backgroundColor: 'rgba(255,255,255,0.7)', padding: 7, height: screenHeight, position: 'absolute'}}>
                    <LottieView 
                        source={require('../assets/animation_lmxss4jj.json')}
                        autoPlay
                        loop
                        style={{width: screenWidht, height: screenHeight * 0.5,marginTop: screenHeight * 0.1, right: 7}}
                    />  
                </View>
                
            )}

            {editPage && (
                <View style={{backgroundColor: 'rgba(255,255,255,0.7)', position: 'absolute',width:screenWidht,height: screenHeight}}>
                    <View style={{backgroundColor: color.blue,borderRadius: 7, width:screenWidht * 0.9,height: screenHeight * 0.59,alignSelf: 'center',marginTop: 170}}>
                            <TouchableOpacity onPress={() => {setEdPag(false); }}>
                                <View style={{backgroundColor: color.white,padding:7,borderRadius: 15, width: screenWidht * 0.5,alignSelf: 'center',marginTop: 30,alignItems: 'center'}}>
                                    <Text style={{fontSize: 30,fontWeight: 'bold', color: color.blue}}>x</Text>
                                </View>
                            </TouchableOpacity>
                        <View style={{alignSelf: 'center',marginRight: 30,marginTop: 70}}>
                            
                            <Input
                                placeholder="new userName"
                                value={userName}
                                onChangeText={(text) => setuserName(text)}
                            />  

                            <TouchableOpacity onPress={() => {_editUsername(); }}>
                                <View style={{backgroundColor: color.white,padding: 7, borderRadius: 7,width:screenWidht * 0.5,alignItems: 'center',marginTop: 70,marginLeft:screenWidht * 0.19}}>
                                    <Text style={{fontSize: 30,color: color.blue,fontWeight: 'bold'}}>edit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            )}

            {editPage1 && (
                <View style={{backgroundColor: 'rgba(255,255,255,0.7)', position: 'absolute',width:screenWidht,height: screenHeight}}>
                    <View style={{backgroundColor: color.blue,borderRadius: 7, width:screenWidht * 0.9,height: screenHeight * 0.59,alignSelf: 'center',marginTop: 170}}>
                            <TouchableOpacity onPress={() => {setEdPag1q(false); }}>
                                <View style={{backgroundColor: color.white,padding:7,borderRadius: 15, width: screenWidht * 0.5,alignSelf: 'center',marginTop: 30,alignItems: 'center'}}>
                                    <Text style={{fontSize: 30,fontWeight: 'bold', color: color.blue}}>x</Text>
                                </View>
                            </TouchableOpacity>
                        <View style={{alignSelf: 'center',marginRight: 30,marginTop: 70}}>
                            
                            <Input
                                placeholder="new password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />  

                            <TouchableOpacity onPress={() => {_editPassword(); }}>
                                <View style={{backgroundColor: color.white,padding: 7, borderRadius: 7,width:screenWidht * 0.5,alignItems: 'center',marginTop: 70,marginLeft:screenWidht * 0.19}}>
                                    <Text style={{fontSize: 30,color: color.blue,fontWeight: 'bold'}}>edit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            )}
        </ImageBackground>
    )
}

export default Profile;