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


function OccSystem (props) {

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [tripData,steTripData] = useState([]);

    const [key,setKey] = useState('');

    const _postOcc = () => {
        (async () => {

            try{

                const postTrip = await axios.post('/addOcc', {
                    title,
                    comment
                });

            }catch(e){
                console.log(e);
            }

        })();
    }

    const _getOcc = () => {
        (async () => {

            try{

                const getTrip = await axios.get('/getOcc');

                steTripData(getTrip.data);

            }catch(e){
                console.log(e);
            }

        })();
    }

    const _delHomeWork = (query) => {
        (async () => {

            try{

                const delHoework = await axios.delete('/delOcc', {
                    params: { q: query ? query : key },
                });

            }catch(e){
                console.log(e);
            }
                
        })();
    }

    const renderItem = ({ item }) => (
        <View style={{backgroundColor: color.white, borderRadius: 15, width: screenWidht * 0.9,alignSelf: 'center', marginTop: 30,padding: 7}}
            onLayout={() => {
               
            }}
            onTouchMove={() => {
                _getOcc();
            }}
        >

            
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: color.blue}}>{item.title}</Text>

                <TouchableOpacity onPress={() => {_delHomeWork(); _getOcc(); }}>
                    <View style={{backgroundColor: color.blue,padding: 3,borderRadius: 7,marginLeft: screenWidht * 0.39,marginTop: 7}}>
                        <Text style={{fontSize: 18, color: color.white, fontWeight: 'bold'}}>Done</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
            
            <Text style={{fontSize: 19, fontWeight: 'bold', color: color.blue,marginTop: 15,marginLeft: 7}}>{item.comment}</Text>


           

            
 
            
        </View>
    );
    
    const keyExtractor = (item) => item.id.toString();



    return (
        <ImageBackground source={require('../../images/backHomescreen.jpg')} style={{width:screenWidht, height:screenHeight,padding: 7}} onLayout={() => {
            _getOcc();
        }}>
            <TouchableOpacity onPress={() => {props.navigation.navigate('HomeSystem')}}>
                <Image source={require('../../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 50,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
            </TouchableOpacity>

            <Text style={{fontSize: 35, fontWeight: 'bold', marginTop: 30 ,padding: 7, color:color.white}}>post Occasions</Text>

            <View style={{backgroundColor: color.white, borderRadius: 15, padding: 3, width:screenWidht * 0.9,alignSelf: 'center', alignItems: 'center',marginTop: 30}}>
                <Input 
                    placeholder="occ type"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    inputStyles={{
                        marginTop: 15,
                        fontSize:19,
                        textAlign: 'left',
                        right: 15
                    }}
                />

                <Input 
                    placeholder="decrip occ"
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    inputStyles={{
                        marginTop: 15,
                        fontSize:19,
                        textAlign: 'left',
                        right: 15,
                        height:screenHeight * 0.05
                    }}
                />

                <TouchableOpacity onPress={() => {_postOcc(); _getOcc(); }} onPressOut={() => {_getOcc();}}>
                    <View style={{backgroundColor: color.blue, padding: 7, borderRadius: 5, width:screenWidht * 0.7,alignItems: 'center'}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold', color:color.white}}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={tripData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </ImageBackground>
    )
}

export default OccSystem;