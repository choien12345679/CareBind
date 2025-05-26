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
