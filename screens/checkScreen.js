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

function CheckScreen (){

    const [aniColor, setAColor] = useState('rgba(255,255,255,0.93)');

    

    return(
        <ImageBackground source={require('../images/fakeBackGro.png')} style={{width:screenWidht, height: screenHeight}} onLayout={() => {
            setTimeout(() => {
                setAColor('rgba(255,255,255,0.7)');
                    setTimeout(() => {
                        setAColor('rgba(255,255,255,0.5)');
                        setTimeout(() => {
                            setAColor('rgba(255,255,255,0.3)');
                            setTimeout(() => {
                                setAColor('rgba(255,255,255,0.1)');
                            }, 2300);
                        }, 1500);
                    }, 790);
            }, 500);
        }}>
            <View style={{backgroundColor: aniColor,shadowColor: color.blue,shadowRadius: 15,shadowOpacity: 0.7}}>

                <Text style={{fontSize: 35, fontWeight: 'bold',position: 'absolute',marginTop: screenHeight * 0.3,alignSelf: 'center', color: color.white}}>Wait for Token.</Text>

                <LottieView 
                    source={require('../assets/animation_lnamtbcr.json')}
                    autoPlay
                    loop
                    style={{width: screenWidht, height: screenHeight}}
                />

            </View>  
        </ImageBackground>
        
    )
}

export default CheckScreen;