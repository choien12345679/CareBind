import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VTExtraInfoScreen({ navigation }) {
  const [characteristics, setCharacteristics] = useState('');
  const [job, setJob] = useState('');
  const [certificate, setCertificate] = useState('');
  const [experience, setExperience] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [experienceFile, setExperienceFile] = useState(null);

  const pickFile = async (setFile) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const handleSignUp = async () => {
    try {
      // 입력값 유효성 검사
      if (!characteristics || !job) {
        Alert.alert('오류', '모든 필수 항목을 입력해주세요');
        return;
      }

      // 기존 회원가입 정보 가져오기
      const existingSignUpData = await AsyncStorage.getItem('vtSignUpData');
      if (!existingSignUpData) {
        Alert.alert('오류', '기본 회원가입 정보를 찾을 수 없습니다.');
        return;
      }

      const parsedSignUpData = JSON.parse(existingSignUpData);

      // 최종 회원가입 정보 생성
      const completeSignUpData = {
        ...parsedSignUpData,
        characteristics: characteristics,
        job: job,
        certificate: certificate,
        experience: experience,
        certificateFile: certificateFile,
        experienceFile: experienceFile,
        signUpCompletedAt: new Date().toISOString(),
        step: 'completed'
      };

      // 최종 회원가입 정보를 vtSignUpData에 업데이트
      await AsyncStorage.setItem('vtSignUpData', JSON.stringify(completeSignUpData));

      // 회원가입 완료 알림
      Alert.alert('가입완료', '자원봉사자 회원가입이 완료되었습니다!', [
        {
          text: '확인',
          onPress: () => navigation.navigate('Login')
        }
      ]);

    } catch (error) {
      console.error('Error completing signup:', error);
      Alert.alert('오류', '회원가입 완료 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
      <Image source={require('../../Components/Images/mainLogo.png')} style={styles.logo} />

      {/* 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="Characteristics"
        placeholderTextColor="#888"
        value={characteristics}
        onChangeText={setCharacteristics}
      />
      <TextInput
        style={styles.input}
        placeholder="Job"
        placeholderTextColor="#888"
        value={job}
        onChangeText={setJob}
      />
      {/* Certificate 입력 + 아이콘 + 파일명/썸네일 */}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Certificate"
          placeholderTextColor="#888"
          value={certificate}
          onChangeText={setCertificate}
        />
        <TouchableOpacity style={styles.iconBtn} onPress={() => pickFile(setCertificateFile)}>
          <Image source={require('../../Components/Images/upload.png')} style={styles.icon} />
        </TouchableOpacity>
        {certificateFile && (
          certificateFile.mimeType && certificateFile.mimeType.startsWith('image/') ? (
            <Image source={{ uri: certificateFile.uri }} style={styles.fileThumb} />
          ) : (
            <Text style={styles.fileName} numberOfLines={1}>{certificateFile.name}</Text>
          )
        )}
      </View>
      {/* Volunteer Experience 입력 + 아이콘 + 파일명/썸네일 */}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Volunteer Experience"
          placeholderTextColor="#888"
          value={experience}
          onChangeText={setExperience}
        />
        <TouchableOpacity style={styles.iconBtn} onPress={() => pickFile(setExperienceFile)}>
          <Image source={require('../../Components/Images/upload.png')} style={styles.icon} />
        </TouchableOpacity>
        {experienceFile && (
          experienceFile.mimeType && experienceFile.mimeType.startsWith('image/') ? (
            <Image source={{ uri: experienceFile.uri }} style={styles.fileThumb} />
          ) : (
            <Text style={styles.fileName} numberOfLines={1}>{experienceFile.name}</Text>
          )
        )}
      </View>
      {/* Sign up 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <LinearGradient colors={["#F5A623", "#FFE259"]} style={styles.gradient}>
          <Text style={styles.buttonText}>Sign up</Text>
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
    marginBottom: 24,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  iconBtn: {
    marginLeft: 8,
    padding: 8,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#888',
  },
  fileThumb: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginLeft: 8,
  },
  fileName: {
    maxWidth: 80,
    marginLeft: 8,
    color: '#888',
    fontSize: 13,
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