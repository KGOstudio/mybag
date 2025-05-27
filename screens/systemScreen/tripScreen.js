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


function TripScreen (props) {

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [tripData,steTripData] = useState([]);

    const [key,setKey] = useState('');


    const _postTrip = () => {
        (async () => {

            try{

                const postTrip = await axios.post('/addTrip', {
                    title,
                    comment
                });

            }catch(e){
                console.log(e);
            }

        })();
    }

    const _getTrip = () => {
        (async () => {

            try{

                const getTrip = await axios.get('/getTrip');

                steTripData(getTrip.data);

            }catch(e){
                console.log(e);
            }

        })();
    }

    const _delHomeWork = (query) => {
        (async () => {

            try{

                const delHoework = await axios.delete('/delTrip', {
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
        >

            
                
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: color.blue}}>{item.title}</Text>

                <TouchableOpacity onPress={() => {setKey(item.title);  _delHomeWork(); _getOcc(); }}>
                    <View style={{backgroundColor: color.blue,padding: 3,borderRadius: 7,left: screenWidht * 0.3,marginTop: 7}}>
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
            _getTrip();
        }}>

            <TouchableOpacity onPress={() => {props.navigation.navigate('HomeSystem')}}>
                <Image source={require('../../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 50,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
            </TouchableOpacity>

            <Text style={{fontSize: 39, fontWeight: 'bold', marginTop: 30 ,padding: 7, color:color.white}}>post Trip</Text>

            <View style={{backgroundColor: color.white, borderRadius: 15, padding: 3, width:screenWidht * 0.9,alignSelf: 'center', alignItems: 'center',marginTop: 30}}>
                <Input 
                    placeholder="Trip place"
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
                    placeholder="decrip trip"
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

                <TouchableOpacity onPress={() => {_postTrip(); _getTrip();}} onPressOut={() => {_getTrip();}} >
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

export default TripScreen;