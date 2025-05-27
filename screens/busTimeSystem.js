import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import color from '../color/mainColor';
import LottieView from "lottie-react-native";
import axios from '../config/axios';
import Input from "../components/Input";



const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function BusTimeSystem () {

    const [bustimeData, setBusTime] = useState([]);

    const [key, setKey] = useState('');
    const [check, setIsAwived] = useState('');



    const _getBusTime = () => {
        (async () => {

            try{

                const getBustime = await axios.get('/getTime');

                setBusTime(getBustime.data);
                
            }catch(e){
                console.log(e);
            }

        })();
    }

    const _editBusTime = () => {
        (async () => {

            try{

                const editBusTime = await axios.post('/updateTime', {
                    check,
                    key
                })
                   

            }catch(e){
                console.log(e);
            }

        })();
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            setKey(item.time1);
            console.log(key);
        }}>
            <View style={{backgroundColor: color.white, borderRadius: 15, width: screenWidht * 0.9,alignSelf: 'center', marginTop: 30,padding: 7, flexDirection: 'row'}}>

                <View style={{
                    backgroundColor: item.isArrived === 'notWork' ? '#09BDC2' : item.isArrived === 'willArived' ?  color.blue :  '#19E13B',
                    padding: 3, width:37,height:37, borderRadius: 30, left: 15,top: 7
                }}></View>
                
                <View style={{marginLeft: screenWidht * 0.39}}>
                    <Text style={{fontSize: 18, right: 30, bottom: 3}}>Time: </Text>

                    <Text style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-end'}}>{item.time1}</Text>
    
                </View>
            
            </View>
        </TouchableOpacity>
       
    );
    
    const keyExtractor = (item) => item.id.toString();


    return(
        <ImageBackground source={require('../images/backgroundWelPage.jpg')} style={{width:screenWidht, height:screenHeight}} onLayout={() => {
            _getBusTime();

        }}>

            

            <Text style={{fontSize: 39, fontWeight: 'bold', color: color.white, marginTop: 70, marginLeft: 30}}>Bus time</Text>

            <View style={{backgroundColor: color.white,padding: 7, width:screenWidht * 0.7,borderRadius: 7, alignSelf: 'center', marginTop: 30}}>
               
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {setIsAwived('notWork'); _editBusTime(); _getBusTime();}}>
                        <View style={{backgroundColor: '#09BDC2', padding: 3, width: 50, height: 50, borderRadius: 15, marginLeft: 19}}></View>
                    </TouchableOpacity>   

               
                    <TouchableOpacity onPress={() => {setIsAwived('willArived');  _editBusTime(); _getBusTime();}}>
                        <View style={{backgroundColor: color.blue, padding: 3, width: 50, height: 50, borderRadius: 15,marginLeft: 30}}></View>
                    </TouchableOpacity>   


                    <TouchableOpacity onPress={() => {setIsAwived('arrived');  _editBusTime(); _getBusTime();}}>
                        <View style={{backgroundColor: '#19E13B', padding: 3, width: 50, height: 50, borderRadius: 15,marginLeft: 30}}></View>
                    </TouchableOpacity>   

                </View>
                 
            </View>



            <ScrollView>
                <FlatList 
                    data={bustimeData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />

                <View style={{padding: 3,marginTop: 100, width: screenWidht}}></View>
            </ScrollView>
            





           

        </ImageBackground>
    )
}


export default BusTimeSystem;