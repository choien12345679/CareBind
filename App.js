import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/Screen/LoginScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpSelectScreen from './src/Screen/SignUp/SignUpSelectScreen';
import MatchingScreen from './src/Screen/MatchingScreen';
import VTSignUpScreen from './src/Screen/SignUp/VTSignUpScreen';
import VTExtraInfoScreen from './src/Screen/SignUp/VTExtraInfoScreen';
import MainScreen from './src/Screen/MainScreen';
import HistoryScreen from './src/Screen/HistoryScreen';
import DPSignUpScreen from './src/Screen/SignUp/DPSignUpScreen';
import DPSurvey from './src/Screen/SignUp/DPSurvey';
import DPMainScreen from './src/Screen/DPMainScreen';
import CameraRequestScreen from './src/Screen/CameraRequestScreen';
import SpeakRequestScreen from './src/Screen/SpeakRequestScreen';
import RequestListScreen from './src/Screen/RequestListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUpSelect" component={SignUpSelectScreen} />
        <Stack.Screen name="Matching" component={MatchingScreen} />
        <Stack.Screen name="VTSignUp" component={VTSignUpScreen} />
        <Stack.Screen name="VTExtraInfo" component={VTExtraInfoScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="DPSignUp" component={DPSignUpScreen} />
        <Stack.Screen name="DPSurvey" component={DPSurvey} />
        <Stack.Screen name="DPMain" component={DPMainScreen} />
        <Stack.Screen name="CameraRequest" component={CameraRequestScreen} />
        <Stack.Screen name="SpeakRequest" component={SpeakRequestScreen} />
        <Stack.Screen name="RequestListScreen" component={RequestListScreen} />
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
