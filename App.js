import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/Screen/LoginScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpSelectScreen from './src/Screen/SignUp/SignUpSelectScreen';
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
