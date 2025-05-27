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

//home screen : (techear)
function ManegarScreen (props) {

    const [aniOpen, setAniOpn] = useState(false);


    

    return(
        <ImageBackground source={require('../images/backHomescreen.jpg')} style={{width:screenWidht, height: screenHeight}}>
            
            

            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 50,alignSelf: 'center', color: color.white, marginLeft: 7}} onPress={() => {AsyncStorage.setItem('check', '')}}>Weko smart school</Text>

                <LottieView 
                    source={require('../assets/animation_lmp5hkax.json')}
                    autoPlay
                    loop
                    style={{width: screenWidht * 0.3, height:screenHeight * 0.15,marginTop: 15, right: screenWidht * 0.33,
                    shadowColor: color.white,shadowRadius: 7,shadowOpacity: 1}}
                    
                />
            </View>

            <View style={{borderRadius: 7, borderColor: color.white, borderWidth: 1,padding: 5,width: screenWidht * 0.7,marginLeft: 15}}>
                <Text style={{fontSize: 17, color: color.normalBlue, fontWeight: '500', marginLeft: 15, shadowColor: color.white,shadowRadius: 7,shadowOpacity: 1}}>My permission: teacher</Text>
            </View>

            <View style={{backgroundColor: color.white, width:screenWidht * 0.9, borderRadius: 7, padding: 1.5,alignSelf: 'center', marginTop: 70}}></View>

                

                <ScrollView horizontal={true} >
                    <TouchableOpacity>
                        <View style={{padding: 7,marginLeft: 50,marginTop: 30,backgroundColor: color.white, width: screenWidht * 0.3,alignItems:'center', borderRadius: 9, height: screenHeight * 0.23}}>
                            <Image source={require('../images/confetti.png')} style={{width:screenWidht * 0.29,height:screenHeight * 0.13, bottom: 15, right: 7, shadowColor: color.blue,shadowRadius: 7,shadowOpacity: 1}}/>

                            <Text style={{fontSize: 18, fontWeight: 'bold', color: color.darkBlue, marginTop: 19}}>Occasions</Text>
                        </View>
                    </TouchableOpacity>
                    

                    <TouchableOpacity onPress={() => {props.navigation.navigate('tripSystem'); }}>
                       <View style={{padding: 7,marginLeft: 50,marginTop: 30,backgroundColor: color.white, width: screenWidht * 0.3,alignItems:'center', borderRadius: 9,height: screenHeight * 0.23}}>
                            <Image source={require('../images/field-trip.png')} style={{width:screenWidht * 0.27,height:screenHeight * 0.13, shadowColor: color.blue,shadowRadius: 7,shadowOpacity: 1}}/>

                            <Text style={{fontSize: 18, fontWeight: 'bold', color: color.darkBlue, marginTop: 19}}>Trip</Text>
                        </View> 
                    </TouchableOpacity>
                    
                </ScrollView>


           
            

        </ImageBackground>
    )
}

export default ManegarScreen;