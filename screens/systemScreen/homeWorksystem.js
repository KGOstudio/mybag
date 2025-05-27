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


function homeWork (props) {

    const [openPostHomework, setopHoWork] = useState(false);

    const [class1, setclass1] = useState('');
    const [openpostWork, setoppoWork] = useState(false);

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [counter, setCounter] = useState('0');
    const [userId, setuseId] = useState('');

    const [homeworkData, setHomeworkData] = useState([]);

    const [aniOpen, setAniOpn] = useState(false);

    const [key, setKey] = useState('');

    const _postHomeWork = () => {
        (async () => {

            try{

                const posthomework = await axios.post('/addHomework', {
                    title,
                    comment,
                    counter,
                    class1,
                    userId
                });


            }catch(e){
                console.log(e);
            }

        })();

    }

    const _getHomeWork = (query) => {
        (async () => {

            try{

                const gethomework = await axios.get('/getHomework', {
                    params: { q: query ? query : userId },
                  });

                setHomeworkData(gethomework.data);

                setAniOpn(true);


            }catch(e){
                console.log(e)
            }

        })();
    }


    const _delHomeWork = (query) => {
        (async () => {

            try{

                const delHoework = await axios.delete('/delHomeWork', {
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
                setTimeout(() => {
                    setAniOpn(false);
                }, 2300);
            }}

            onStartShouldSetResponder={() => {
                setKey(item.class1);
            }}
        >

            
            {!aniOpen ? (
                <View >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold', color: color.blue}}>{item.title}</Text>

                        <TouchableOpacity onPress={() => {setKey(item.class1); console.log(key); _delHomeWork(); }}>
                            <View style={{backgroundColor: color.blue, padding: 3, borderRadius: 7,width:screenWidht * 0.15,alignItems: 'center',marginLeft: screenWidht * 0.5,marginTop: 7}}>
                                <Text style={{fontSize: 18, color: color.white, fontWeight: 'bold'}}>Done</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 19, fontWeight: 'bold', color: color.blue,marginTop: 15,marginLeft: 7}}>{item.comment}</Text>   

                    <Text style={{fontSize: 18,fontWeight: 'bold', color: color.darkBlue, marginLeft: 7,marginTop: 15}}>{item.class1}</Text>                             
                </View>
                
            ): 
            (
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
    );
    
    const keyExtractor = (item) => item.id.toString();


    return (
        <ImageBackground source={require('../../images/backHomescreen.jpg')} style={{width: screenWidht, height:screenHeight, padding: 7}} onLayout={async() => {

            setuseId(await AsyncStorage.getItem('userId'));
            console.log(userId);
            _getHomeWork();

            

            
        }}>

            
            <TouchableOpacity onPress={() => {props.navigation.navigate('HomeSystem')}}>
                <Image source={require('../../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 50,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
            </TouchableOpacity>

            <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 30,marginLeft: 7, color: color.white}}
            
            onPress={async() => {setuseId(await AsyncStorage.getItem('userId')); console.log(userId); _getHomeWork();}}>HomeWork</Text>


            <View style={{backgroundColor: color.white, padding: 15, borderRadius: 7, marginTop: 30, width: screenWidht * 0.7,alignSelf: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={async() => {setuseId(await AsyncStorage.getItem('userId')); console.log(await AsyncStorage.getItem('userId')); setopHoWork(true);}}>
                    <View style={{backgroundColor: color.blue, padding: 3, width: screenWidht * 0.5, alignItems: 'center', borderRadius:15, }}>
                        <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {openPostHomework && (
                <View style={{backgroundColor: 'rgba(255,255,255,0.9)', width:screenWidht, height: screenHeight, padding: 7, position: 'absolute'}}>
                    {!openpostWork ? (<View style={{backgroundColor: color.blue,padding: 5, width: screenWidht * 0.9, borderRadius: 7,alignSelf: 'center', marginTop: screenHeight * 0.1,marginTop: screenHeight * 0.13}}>

                        <TouchableOpacity onPress={() => {setopHoWork(false); _getHomeWork();}}>
                            <Image source={require('../../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 15,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
                        </TouchableOpacity>

                        <ScrollView style={{height: screenHeight * 0.85,marginTop: 7}}>
                            <TouchableOpacity onPress={() => {setclass1('10com'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>10com</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('10net'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>10net</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1002'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1002</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1003'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1003</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1004'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1004</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1005'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1005</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1006'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1006</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1007'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1007</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('11com'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>11com</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('11net'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>11net</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1102'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1102</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setclass1('1103'); setoppoWork(true); }}>
                                <View style={{backgroundColor: color.darkBlue, borderRadius: 15, width: screenWidht * 0.7, alignSelf: 'center', padding: 7,marginTop: 30}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.white}}>1103</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                    ):(
                        <View style={{backgroundColor: color.blue, width:screenWidht * 0.9, height: screenHeight * 0.79,alignSelf: 'center',  marginTop: screenHeight * 0.13, borderRadius: 15}}>

                            <TouchableOpacity onPress={() => {setoppoWork(false); }}>
                                <Image source={require('../../images/left-arrow.png')} style={{width:screenWidht * 0.07, height:screenHeight * 0.03,marginTop: 15,marginLeft: 7,shadowColor: color.white, shadowRadius: 7,shadowOpacity: 1}}/>
                            </TouchableOpacity>

                            <Input 
                                placeholder="title"
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                inputStyles={{
                                    marginTop: screenHeight * 0.1,
                                    fontSize:19,
                                    textAlign: 'left',
                                    right: 15
                                }}
                            />

                            <Input 
                                placeholder="comment"
                                value={comment}
                                onChangeText={(text) => setComment(text)}
                                inputStyles={{
                                    marginTop: screenHeight * 0.03,
                                    fontSize:19,
                                    textAlign: 'left',
                                    right: 15,
                                    height:screenHeight * 0.3
                                }}
                            />


                            <TouchableOpacity onPress={() => {_postHomeWork(); _getHomeWork();}}>
                                <View style={{backgroundColor: color.white, padding: 7, width:screenWidht * 0.7, borderRadius: 7, alignSelf: 'center',alignItems: 'center'}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: color.blue}}>post</Text>
                                </View>
                            </TouchableOpacity>



                        </View>
                    )}


                    
                </View>
            )}

            {!openPostHomework && 
            <FlatList 
                data={homeworkData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                
            />
            }



        </ImageBackground>
    )
}

export default homeWork;