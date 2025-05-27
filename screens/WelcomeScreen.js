import React from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import color from '../color/mainColor';
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function WellcomeScreen (props) {


    return (
        <ImageBackground source={require('../images/backgroundWelPage.jpg')} style={{width: screenWidht, height: screenHeight}} onLayout={async() => {
            if (await AsyncStorage.getItem('check') === 'kgo'){
                props.navigation.navigate('check');
                setTimeout(() => {
                    props.navigation.navigate('chat')
                }, 2300)
                 
            }else if (await AsyncStorage.getItem('check') === 'Kgo'){
                props.navigation.navigate('BusTimeSystem');
            }
            else if (await AsyncStorage.getItem('check') === 'true'){
                props.navigation.navigate('HomeWork');
            }
            else{
                props.navigation.navigate('WelcomeScr')
            }
        }}>
            <Text style={{fontSize: 30, marginTop: 79, fontWeight: 'bold', marginLeft: 15, padding: 1, color: color.white}}>weko smart school</Text>

            <TouchableOpacity>
                <View style={{backgroundColor: color.white, padding: 7, borderRadius: 15, alignItems: 'center', width: screenWidht * 0.1, alignSelf: 'flex-end', position: 'absolute', right: 15,top: 30}}>
                    <Text style={{fontSize: 30, color: color.blue, fontWeight: 'bold'}}>?</Text>
                </View>
            </TouchableOpacity>

            <LottieView 
                source={require('../assets/animation_lmnlve4a.json')}
                autoPlay
                loop
                style={{width: screenWidht, height: screenHeight * 0.5, bottom: 30}}
            />

            <TouchableOpacity onPress={() => {props.navigation.navigate('login'); }}>
                <View style={{backgroundColor: color.blue, padding: 7, borderRadius: 15, alignItems: 'center', width: screenWidht * 0.7, alignSelf: 'center', marginTop: screenHeight * 0.19}}>
                    <Text style={{fontSize: 30, color: color.white, fontWeight: 'bold'}}>Get started</Text>
                </View>
            </TouchableOpacity>

            
        </ImageBackground>
    )
}

export default WellcomeScreen;