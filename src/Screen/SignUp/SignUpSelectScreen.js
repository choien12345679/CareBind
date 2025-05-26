import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpSelectScreen({ navigation }) {
  
  // 사회적 약자 선택 함수
  const handleSelectDP = async () => {
    try {
      // 사용자 유형 정보를 AsyncStorage에 저장
      const userTypeData = {
        userType: 'DP', // Socially Disadvantaged Person
        selectedAt: new Date().toISOString()
      };
      
      await AsyncStorage.setItem('selectedUserType', JSON.stringify(userTypeData));
      
      // 사회적 약자 회원가입 화면으로 이동
      navigation.navigate('DPSignUp');
      
    } catch (error) {
      console.error('Error saving user type:', error);
      Alert.alert("오류", "사용자 유형 저장 중 오류가 발생했습니다.");
    }
  };

  // 자원봉사자 선택 함수
  const handleSelectVT = async () => {
    try {
      // 사용자 유형 정보를 AsyncStorage에 저장
      const userTypeData = {
        userType: 'VT', // Volunteer
        selectedAt: new Date().toISOString()
      };
      
      await AsyncStorage.setItem('selectedUserType', JSON.stringify(userTypeData));
      
      // 자원봉사자 회원가입 화면으로 이동 (추후 구현)
      Alert.alert("알림", "자원봉사자 회원가입 화면은 아직 구현 중입니다.");
      
    } catch (error) {
      console.error('Error saving user type:', error);
      Alert.alert("오류", "사용자 유형 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <Image source={require('../../Components/Images/mainLogo.png')} style={styles.logo} />

      {/* Socially Disadvantaged 버튼 */}
      <TouchableOpacity 
        style={styles.selectBtn}
        onPress={handleSelectDP}
      >
        <Text style={styles.selectBtnText}>Socially Disadvantaged</Text>
      </TouchableOpacity>

      {/* Volunteer 버튼 */}
      <TouchableOpacity 
        style={styles.selectBtn}
        onPress={handleSelectVT}
      >
        <Text style={styles.selectBtnText}>Volunteer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F5A623',
    marginBottom: 32,
    letterSpacing: 2,
  },
  selectBtn: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a89c91',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2, // 안드로이드 그림자
  },
  selectBtnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a5351',
  },
});
