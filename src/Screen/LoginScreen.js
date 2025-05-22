import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

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
        placeholder="Passwords"
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
      <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('SignUpSelect')}>
        <Text style={styles.signupBtnText}>Sign up</Text>
      </TouchableOpacity>

      {/* LOGIN (그라데이션 버튼) */}
      <TouchableOpacity style={styles.loginBtn}>
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