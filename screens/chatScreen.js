import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import color from '../color/mainColor';
import LottieView from "lottie-react-native";
import axios from '../config/axios';
import Input from "../components/Input";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";



const screenWidht = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


function ChatScreen (props){

    const [class1, setClass] = useState();
    const [comment, setComment]  = useState('');
    const [userSend, setUserSend] = useState('');

    const [commentData, setCommentData] = useState([]);
    const [aniOpen, setAniOpn] = useState(false);
    const [count, setCount] = useState(0);

    const [usersData, setUsersData] = useState([]); 

    const [heghtKeyboard, setHeightKeyboard] = useState(screenHeight * 0.9);

    const [profileGroup, setProfieGroup] = useState(false);

    const [getTyperdata, setTyperData] = useState([]);

    const _postChat = () => {
        (async () => {

            try{

                const postChat = await axios.post('/postChat', {
                    comment,
                    userSend,
                    class1
                });

                setComment('');

                

            }catch(e){
                console.log(e);
            }

        })();
    }


    const _getChat = (query) => {
        (async () => {

            try{

                const getChat = await axios.get('/getChat', {
                    params: { q: query ? query : class1 },
                });

                setCommentData(getChat.data);

            }catch(e){
                console.log(e);
            }

        })();
    }

    const _getUser = (query) => {
        (async () => {

            try{

                const getChat = await axios.get('/getUsers', {
                    params: { q: query ? query : class1 },
                });

                setUsersData(getChat.data);

            }catch(e){
                console.log(e);
            }

        })();
    }


    const _editTyper = () => {
        (async () => {
            try{

                const edittyper = await axios.post('/editTyper',  {
                    userSend
                });

            }catch(e){
                console.log(e);
            }
        })();
    }

    const _editTyperFalse = () => {
        (async () => {
            try{

                const edittyper = await axios.post('/editTyperFalse',  {
                    userSend
                });

            }catch(e){
                console.log(e);
            }
        })();
    }

    const _getTyper = () => {
        (async () => {


            try{

                const gettyper = await axios.get('/getTyper')

                setTyperData(gettyper.data);

            }catch(e){
                console.log(e);
            }
        })();
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity >
            <View style={{backgroundColor:item.userSend !== userSend ? color.darkBlue:color.white, borderRadius: 15, width: screenWidht * 0.5, marginTop: 30,padding: 7,marginLeft: 15, alignSelf: item.userSend !== userSend ? 'flex-end': 'flex-start',marginRight: 15}}
                onLayout={() => {
                    if (count < 1){
                        setAniOpn(true);
                    }
                    setTimeout(() => {
                        setAniOpn(false);
                        setCount(1);
                    }, 2700);
                    
                    
                    
                }}

                
                
            >

            
            {!aniOpen ? (
                <>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: item.userSend !== userSend ? color.white: color.blue,}}>{item.userSend}</Text>

                <Text style={{fontSize: 19, fontWeight: 'bold', color: item.userSend !== userSend ? color.white: color.blue,}}>{item.comment}</Text>

                </>
            ): (
                <View>
                    <LottieView 
                        source={require('../assets/animation_lmth263l.json')}
                        autoPlay
                        loop
                        style={{width: screenWidht, height:screenHeight * 0.1, right: screenWidht * 0.13}}
                    />
                </View>
            )}

            
 
            
            </View>
        </TouchableOpacity>
        
    );
    
    const renderItem1 = ({ item }) => (
        <TouchableOpacity >
            <View style={{backgroundColor:item.userSend !== userSend ? color.darkBlue:color.white, borderRadius: 15, width: screenWidht * 0.5, marginTop: 30,padding: 7,alignSelf: 'center'}}
                onLayout={() => {
                    if (count < 1){
                        setAniOpn(true);
                    }
                    setTimeout(() => {
                        setAniOpn(false);
                        setCount(1);
                    }, 2700);
                    
                    
                    
                }}

                
                
            >

            
            {!aniOpen ? (
                <>
                <Text style={{fontSize: 19, fontWeight: 'bold', color: item.userSend !== userSend ? color.white: color.blue,textAlign: 'center'}}>{item.userName}</Text>


                </>
            ): (
                <View>
                    <LottieView 
                        source={require('../assets/animation_lmth263l.json')}
                        autoPlay
                        loop
                        style={{width: screenWidht, height:screenHeight * 0.1, right: screenWidht * 0.13}}
                    />
                </View>
            )}

            
 
            
            </View>
        </TouchableOpacity>
        
    );

    const renderItem3 = ({ item }) => (
        <TouchableOpacity >
            <View style={{backgroundColor:item.userSend !== userSend ? color.darkBlue:color.white, borderRadius: 15, width: screenWidht * 0.5, marginTop: 30,padding: 7,alignSelf: 'center'}}>  

                <Text style={{fontSize: 19, fontWeight: 'bold', color: item.userSend !== userSend ? color.white: color.blue,textAlign: 'center'}}>{item.userSend}</Text>
            
            </View>
        </TouchableOpacity>
        
    );

    const keyExtractor = (item) => item.id.toString();

    return(
        <ImageBackground source={require('../images/backHomescreen.jpg')} style={{width: screenWidht,height: screenHeight,padding: 0}} onLayout={async() => {
            setClass(await AsyncStorage.getItem('class'));
            setUserSend(await AsyncStorage.getItem('userId'));
            _getChat();
            _getUser();

            

            console.log(userSend + "  "+ screenWidht);
            console.log(screenHeight);
        }}>
            <View style={{backgroundColor: color.blue,width: screenWidht ,padding: 7,marginTop: screenWidht < 399 ? 50 : 39,}} >
                <TouchableOpacity onPress={() => {props.navigation.navigate('Home'); setCount(0); console.log('.')}}>
                    <Image source={require('../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 3,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
                </TouchableOpacity>

                <Text style={{fontSize: 30, fontWeight: 'bold',color: color.white,alignSelf: 'center'}} onPress={() => {setProfieGroup(true); _getUser(); _getChat(); _getTyper();}}>{class1}</Text>

                    <FlatList 
                        data={getTyperdata}
                        renderItem={renderItem3}
                        keyExtractor={keyExtractor}
                        horizontal={true}
                    />
                
            </View>

            <ScrollView onTouchEnd={() => {_getChat(); _editTyperFalse(); _getTyper(); console.log(screenHeight * 0.39 + 39); setHeightKeyboard(screenHeight * 0.9)}} style={{maxHeight: heghtKeyboard === screenHeight * 0.9 ? screenHeight  : screenHeight * 0.39}}>
                <FlatList 
                    data={commentData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />

                <View style={{padding: 3, width: screenWidht, marginTop: heghtKeyboard === screenHeight * 0.9 ?  150 : 570}}></View>
            </ScrollView>

            <View style={{ borderRadius: 9,backgroundColor: color.blue, padding: 7,marginTop:  heghtKeyboard, position: 'absolute',width: screenWidht,flexDirection: 'row',height: screenHeight * 0.5}} onTouchEnd={() => {
                setHeightKeyboard(screenHeight * 0.55);
                _editTyper();
            }}>
                <Input 
                    placeholder="message"
                    inputStyles={{
                        marginTop: 15,
                        textAlign: 'left',
                        borderRadius:30,
                        bottom: 159 + 5,
                        marginRight: 3
                    }}
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                />
                <TouchableOpacity onPress={() => {_postChat(); _getChat(); console.log('send');}}>
                    <Image source={require('../images/send-message.png')} style={{width: 30, height: 30,marginLeft:screenWidht < 399 ? 7 :  30,marginTop: 19}}/>
                </TouchableOpacity>
            </View>


            {profileGroup && (
                <View style={{position: 'absolute', width: screenWidht ,height: screenHeight , padding: 7,backgroundColor: 'rgba(255,255,255,0.9)'}} onTouchEnd={() => {_getUser();}}>
                    <Text style={{fontSize: 50, fontWeight: 'bold', color: color.blue, marginTop: 70,alignSelf: 'center'}}>{class1}</Text>

                    <FlatList 
                        data={usersData}
                        renderItem={renderItem1}
                        keyExtractor={keyExtractor}
                    />

                    <TouchableOpacity onPress={() => {setProfieGroup(false); }}>
                        <View style={{backgroundColor: color.blue,padding: 7,borderRadius: 7,alignSelf: 'center',bottom: 30}}>
                            <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>close</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </ImageBackground>
    )
}

export default ChatScreen;