import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // 로그인 함수
  const handleLogin = async () => {
    try {
      // 입력값 유효성 검사
      if (!id || !pw) {
        Alert.alert("오류", "ID와 Password를 모두 입력해주세요.");
        return;
      }

      // 자원봉사자 데이터 확인
      const vtUserData = await AsyncStorage.getItem('vtSignUpData');
      // 장애인 데이터 확인  
      const dpUserData = await AsyncStorage.getItem('completeUserData');
      
      let loginSuccess = false;
      let userInfo = null;

      // 자원봉사자 로그인 확인
      if (vtUserData) {
        const parsedVTUserData = JSON.parse(vtUserData);
        if (parsedVTUserData.id === id && parsedVTUserData.password === pw) {
          loginSuccess = true;
          userInfo = parsedVTUserData;
        }
      }

      // 장애인 로그인 확인 (자원봉사자 로그인이 실패한 경우에만)
      if (!loginSuccess && dpUserData) {
        const parsedDPUserData = JSON.parse(dpUserData);
        if (parsedDPUserData.id === id && parsedDPUserData.password === pw) {
          loginSuccess = true;
          userInfo = parsedDPUserData;
        }
      }

      if (loginSuccess && userInfo) {
        // 로그인 성공
        // 현재 로그인한 사용자 정보 저장
        await AsyncStorage.setItem('currentUser', JSON.stringify(userInfo));
        
        // 사용자 유형에 따라 다른 화면으로 이동
        if (userInfo.userType === 'DP') {
          // 장애인 메인화면으로 이동
          navigation.navigate('DPMain');
        } else if (userInfo.userType === 'VT') {
          // 자원봉사자 매칭화면으로 이동
          navigation.navigate('Matching');
        }
      } else {
        Alert.alert("로그인 실패", "ID 또는 Password가 올바르지 않습니다.");
      }
      
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("오류", "로그인 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 버튼 클릭 함수
  const handleSignUp = () => {
    navigation.navigate('SignUpSelect');
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <Image source={require('../Components/Images/mainLogo.png')} style={styles.logo} />

      {/* ID 입력 */}
      <TextInput
        style={styles.input}
        placeholder="ID"
        placeholderTextColor="#6e6259"
        value={id}
        onChangeText={setId}
      />

      {/* PW 입력 */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#6e6259"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
      />

      {/* Find ID / Find Password */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.smallBtn}>
          <Text style={styles.smallBtnText}>Find ID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallBtn}>
          <Text style={styles.smallBtnText}>Find Password</Text>
        </TouchableOpacity>
      </View>

      {/* Sign up */}
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
        <Text style={styles.signupBtnText}>Sign up</Text>
      </TouchableOpacity>

      {/* LOGIN (그라데이션 버튼) */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <LinearGradient
          colors={['#F5A623', '#FFE259']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </LinearGradient>
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
  input: {
    width: '100%',
    height: 56,
    borderColor: '#a89c91',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  smallBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#a89c91',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  smallBtnText: {
    color: '#6e6259',
    fontWeight: 'bold',
  },
  signupBtn: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#a89c91',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  signupBtnText: {
    color: '#6e6259',
    fontWeight: 'bold',
  },
  loginBtn: {
    width: '100%',
    borderRadius: 12,
    marginTop: 16,
    overflow: 'hidden', // 그라데이션이 둥글게 잘리도록
  },
  gradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 2,
  },
});