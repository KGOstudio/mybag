import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import color from '../color/mainColor';
import LottieView from "lottie-react-native";
import axios from '../config/axios';
import Input from "../components/Input";



const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function BustimeScreen (props) {

    const [bustimeData, setBusTime] = useState([]);

    const [checkd,setCheck] = useState(1);

    const [date,setDate] = useState(null);



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

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            if (item.isArrived === 'notWork') {setCheck(1);} 
             else if (item.isArrived === 'willArived') {setCheck(3);}
              else {setCheck(5);}


                
            }}>
            <View style={{backgroundColor: color.white, borderRadius: 15, width: screenWidht * 0.9,alignSelf: 'center', marginTop: 30,padding: 7, flexDirection: 'row'}} onLayout={() => {
                     if (item.isArrived === 'willArived') {setCheck(3);}
                    
                     else if (item.isArrived === 'arrived') {setCheck(5);}
            }}
                
            >

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

            <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
                <Image source={require('../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 50,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 39, fontWeight: 'bold', color: color.white, marginTop: 15, marginLeft: 30}}>Bus time</Text>

                <TouchableOpacity onPress={() => {_getBusTime(); }}> 
                    <Image source={require('../images/reload.png')} style={{width: screenWidht * 0.11,marginTop: 7,marginLeft:screenWidht * 0.3, height: screenHeight * 0.05}} />
                </TouchableOpacity>
            </View>


            <View style={{backgroundColor: color.white,padding: 7, width:screenWidht * 0.7,borderRadius: 7, alignSelf: 'center', marginTop: 30}}>
               
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                        <View style={{backgroundColor: '#09BDC2', padding: 3, width: 30, height: 30, borderRadius: 15}}></View>
                    </TouchableOpacity>   

                    <Text style={{marginTop: 7,marginLeft: 15, fontWeight: 'bold', color: color.normalBlue, shadowColor: color.blue,shadowRadius: 7,shadowOpacity: 1}}>out work</Text>

                    {checkd === 1 && <View style={{backgroundColor: color.darkBlue, padding: 3,borderRadius: 30, width: 15,height: 15,marginTop: 7,marginLeft: 100}}></View>}
                </View>
               
                <View style={{flexDirection: 'row', marginTop: 15, borderTopColor: color.normalBlue, borderTopWidth: 3,borderRadius: 15,paddingTop: 7}}>
                    <TouchableOpacity>
                        <View style={{backgroundColor: color.blue, padding: 3, width: 30, height: 30, borderRadius: 15}}></View>
                    </TouchableOpacity>   

                    <Text style={{marginTop: 7,marginLeft: 15, fontWeight: 'bold', color: color.normalBlue, shadowColor: color.blue,shadowRadius: 7,shadowOpacity: 1}}>Will Arived</Text>
                
                    {checkd === 3 && <View style={{backgroundColor: color.darkBlue, padding: 3,borderRadius: 30, width: 15,height: 15,marginTop: 7,marginLeft: 100}}></View>}

                
                </View>

                <View style={{flexDirection: 'row', marginTop: 15, borderTopColor: color.normalBlue, borderTopWidth: 3,borderRadius: 15,paddingTop: 7}}>
                    <TouchableOpacity>
                        <View style={{backgroundColor: '#19E13B', padding: 3, width: 30, height: 30, borderRadius: 15}}></View>
                    </TouchableOpacity>   

                    <Text style={{marginTop: 7,marginLeft: 15, fontWeight: 'bold', color: color.normalBlue, shadowColor: color.blue,shadowRadius: 7,shadowOpacity: 1}}>Arrived</Text>
                
                    {checkd === 5 && <View style={{backgroundColor: color.darkBlue, padding: 3,borderRadius: 30, width: 15,height: 15,marginTop: 7,marginLeft: 100}}></View>}

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

export default BustimeScreen;