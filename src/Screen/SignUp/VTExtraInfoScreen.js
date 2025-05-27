import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';

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

  const handleSignUp = () => {
    if (!characteristics || !job) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    // TODO: Add actual sign up logic here
    Alert.alert('Success', 'Sign up completed successfully', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login')
      }
    ]);
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