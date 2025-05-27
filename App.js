import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import Register from './screens/registerScreen';
import HomeScreen from './screens/HomeScreen';
import BustimeScreen from './screens/busTimeScreen';
import BusTimeSystem from './screens/busTimeSystem';
import HomeSystem from './screens/Homesystm';
import homeWork from './screens/systemScreen/homeWorksystem';
import homeWorkStudent from './screens/systemStudent/homeWork';
import ExamSystem from './screens/systemScreen/exam';
import ExamStudent from './screens/systemStudent/exam';
import Profile from './screens/profile';
import ManegarScreen from './screens/manegarHomeScreen';
import TripScreen from './screens/systemScreen/tripScreen';
import Trip from './screens/systemStudent/trip';
import OccSystem from './screens/systemScreen/occSystem';
import OccUi from './screens/systemStudent/occUi';
import CheckScreen from './screens/checkScreen';
import ChatScreen from './screens/chatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* first screen */}
        <Stack.Screen
          name="WelcomeScr"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />

        {/* login screen & check admin... */}
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        {/* for admin only */}

        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />

        <Stack.Screen
          name="manegarScreen"
          options={{ headerShown: false }}
          component={ManegarScreen}
        /> 

        {/* main screen & system front/back.end */}

        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />

        {/* for driver (system if isArrived | no) */}

        <Stack.Screen
          name="BusTime"
          options={{ headerShown: false }}
          component={BustimeScreen}
        />  
        {/* bus time ui */}

        <Stack.Screen
          name="BusTimeSystem"
          options={{ headerShown: false }}
          component={BusTimeSystem}
        /> 

          {/* system for teacher only */}


        <Stack.Screen
          name="HomeSystem"
          options={{ headerShown: false }}
          component={HomeSystem}
        />    

        <Stack.Screen
          name="HomeWork"
          options={{ headerShown: false }}
          component={homeWork}
        /> 

        <Stack.Screen
          name="HomeWorkAPI"
          options={{ headerShown: false }}
          component={homeWorkStudent}
        />
        <Stack.Screen
          name="examSystem"
          options={{ headerShown: false }}
          component={ExamSystem}
        />

        <Stack.Screen
          name="examStudent"
          options={{ headerShown: false }}
          component={ExamStudent}
        />

        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
          component={Profile}
        />

        <Stack.Screen
          name="tripSystem"
          options={{ headerShown: false }}
          component={TripScreen}
        />

        <Stack.Screen
          name="tripScreen"
          options={{ headerShown: false }}
          component={Trip}
        />

        <Stack.Screen
          name="occSystem"
          options={{ headerShown: false }}
          component={OccSystem}
        />

        <Stack.Screen
          name="occUi"
          options={{ headerShown: false }}
          component={OccUi}
        />
          
        <Stack.Screen
          name="check"
          options={{ headerShown: false }}
          component={CheckScreen}
        />

        <Stack.Screen
          name="chat"
          options={{ headerShown: false }}
          component={ChatScreen}
        />

        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
