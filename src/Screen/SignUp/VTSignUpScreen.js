import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

export default function VTSignUpScreen({ navigation }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    Alert.alert(
      '프로필 사진 등록',
      '사진을 선택하거나 촬영하세요.',
      [
        {
          text: '카메라로 촬영',
          onPress: async () => {
            const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
            if (!cameraPerm.granted) return;
            const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.7 });
            if (!result.canceled) setProfileImage(result.assets[0].uri);
          }
        },
        {
          text: '앨범에서 선택',
          onPress: async () => {
            const libPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!libPerm.granted) return;
            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.7 });
            if (!result.canceled) setProfileImage(result.assets[0].uri);
          }
        },
        { text: '취소', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 프로필 이미지/카메라 아이콘 */}
      <TouchableOpacity style={styles.cameraCircle} onPress={pickImage} activeOpacity={0.7}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image source={require('../../Components/Images/camera.png')} style={styles.cameraIcon} />
        )}
      </TouchableOpacity>
      {/* 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="ID"
        placeholderTextColor="#888"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="PassWord"
        placeholderTextColor="#888"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#888"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone-Number"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {/* Continue 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VTExtraInfo')}>
        <LinearGradient colors={["#F5A623", "#FFE259"]} style={styles.gradient}>
          <Text style={styles.buttonText}>Continue</Text>
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
  cameraCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cameraIcon: {
    width: 56,
    height: 44,
    resizeMode: 'contain',
    tintColor: '#888',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  input: {
    width: '100%',
    height: 56,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    marginTop: 16,
    overflow: 'hidden',
  },
  gradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 2,
  },
});
