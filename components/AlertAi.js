import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, {useState} from 'react';
import { Foundation, Ionicons ,Feather} from '@expo/vector-icons';

const screemWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;



function AlertAI ({ title, succe, wrong, alert }) {

    const [width, setWidth] = useState(0);
    const [widthts, setWidthist] = useState(false);

    if (!widthts){
        setTimeout(() => {
            setWidth(screemWidth * 0.3);
            console.log('...1');
            setTimeout(() => {
                setWidth(screemWidth * 0.5);
                console.log('..2');
                setTimeout(() => {
                    setWidth(screemWidth * 0.7);
                    console.log('.3');
                }, 700)
            }, 700)
        }, 700);
        setWidthist(true);
    }


    return(
        <View style={{justifyContent: 'flex-start', marginTop: 50, alignItems: 'center', backgroundColor: succe ? 'rgba(255,255,255,0.7)' : wrong ? 'rgba(255,255,255,0.3)' :'rgba(0,0,0,0.15)', width: width, alignSelf: 'center',padding: 5, borderRadius: 15, shadowColor: 'black', shadowRadius: 7,shadowOpacity: 1
        ,borderColor: succe ?  '#11E411' : wrong ? 'red' :'#EAE00D', borderWidth: 3, flexDirection: 'row'}}>
            
            {alert && <Foundation name="alert" size={24} color="#EAE00D"  style={{marginLeft: 15}}/>}
            
            {succe && <Ionicons name="checkmark-done-circle" size={30} color="green" style={{marginLeft: 15}}/>}

            {wrong && <Feather name="x-circle" size={30} color="red" style={{marginLeft: 15}} />}

            <Text style={{marginLeft: 30, fontSize: 18, color: 'white'}}>{title}</Text>

        </View>
    )

}

export default AlertAI;

