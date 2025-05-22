import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function SignUpSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 로고 */}
      <Image source={require('../../Components/Images/mainLogo.png')} style={styles.logo} />

      {/* Socially Disadvantaged 버튼 */}
      <TouchableOpacity style={styles.selectBtn}>
        <Text style={styles.selectBtnText}>Socially Disadvantaged</Text>
      </TouchableOpacity>

      {/* Volunteer 버튼 */}
      <TouchableOpacity style={styles.selectBtn}>
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
