import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import color from "../../color/mainColor";
import LottieView from "lottie-react-native";
import axios from '../../config/axios';
import Input from "../../components/Input";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { render } from "react-dom";



const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function OccUi (props) {

    const [class1, setclass1] = useState('');

    const [homeworkData, setHomeworkData] = useState([]);

    const [aniOpen, setAniOpn] = useState(false);

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const [infoHomeWork, swtInfoHomwrok] = useState(false);

   

    const _getHomeWork = () => {
        (async () => {

            try{

                const gethomework = await axios.get('/getOcc')
                

                setHomeworkData(gethomework.data);

                setAniOpn(true);


            }catch(e){
                console.log(e)
            }

        })();
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {setTitle(item.title); setComment(item.comment); swtInfoHomwrok(true);}}>
            <View style={{backgroundColor: color.white, borderRadius: 15, width: screenWidht * 0.9,alignSelf: 'center', marginTop: 30,padding: 7}}
                onLayout={() => {
                    setTimeout(() => {
                        setAniOpn(false);
                    }, 2300);
                }}
            >

            
            {!aniOpen ? (
                <>
                <Text style={{fontSize: 50, fontWeight: 'bold', color: color.blue}}>{item.title}</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold', color:color.blue,marginTop: 15,marginLeft: 7,width: screenWidht * (0.3-0.07),maxHeight: 30}}>{item.comment}</Text>

                </>
            ): (
                <View>
                    <LottieView 
                        source={require('../../assets/animation_lmth263l.json')}
                        autoPlay
                        loop
                        style={{width: screenWidht, height:screenHeight * 0.1}}
                    />
                </View>
            )}

            
 
            
            </View>
        </TouchableOpacity>
        
    );
    
    const keyExtractor = (item) => item.id.toString();


    return (
        <ImageBackground source={require('../../images/backHomescreen.jpg')} style={{width: screenWidht, height:screenHeight, padding: 7}} onLayout={async() => {
            setclass1(await AsyncStorage.getItem('class'));
            console.log(class1);
            _getHomeWork(); 
        }}>

            
            <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                <Image source={require('../../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 50,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
            </TouchableOpacity>

            <Text style={{fontSize: 39, fontWeight: 'bold', marginTop: 30,marginLeft: 7, color: color.white}}   
            onPress={async() => {setclass1(await AsyncStorage.getItem('class')); console.log(class1); _getHomeWork();}}>Occasions</Text>
            
            <FlatList 
                data={homeworkData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                
            />

            {infoHomeWork && (
                <View style={{backgroundColor: 'rgba(255,255,255,0.7)', padding: 7,width:screenWidht ,height: screenHeight, position: 'absolute'}}>
                    <View style={{backgroundColor: color.blue, padding: 7, borderRadius: 15, marginTop:screenHeight * 0.5, width:screenWidht * 0.9,alignSelf:'center' , height:screenHeight *0.7, bottom: 300}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>{title}</Text>
                        <Text style={{fontSize: 19, fontWeight: '590', color: color.white, marginTop: 15 ,marginLeft: 7, width: screenWidht * 0.79}}>{comment}</Text>

                        <TouchableOpacity onPress={() => {swtInfoHomwrok(false); }}>
                            <View style={{backgroundColor: color.white, padding: 7,borderRadius: 7, alignSelf: 'center', width: screenWidht * 0.5, height:screenHeight * 0.05,marginTop: screenHeight * 0.5}}>
                                <Image source={require('../../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 7,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            ) }
            



        </ImageBackground>
    )
}

export default OccUi;