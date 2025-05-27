import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import openaiKey from '../Components/Warning/openAPIkey';

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.m4a',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

export default function SpeakRequestScreen({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [audioUri, setAudioUri] = useState(null);

  // 녹음 시작/정지
  const handleRecord = async () => {
    if (isRecording) {
      // 녹음 정지
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('녹음 파일 URI:', uri);
      setAudioUri(uri);
      setRecording(null);
      await extractTextFromAudio(uri);
    } else {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Please grant audio recording permission.');
          return;
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const rec = new Audio.Recording();
        await rec.prepareToRecordAsync(recordingOptions);
        await rec.startAsync();
        setRecording(rec);
        setIsRecording(true);
        setExtractedText('');
      } catch (err) {
        console.error('Recording error:', err);
        Alert.alert('오류', '녹음 중 오류가 발생했습니다.');
      }
    }
  };

  // Google Speech-to-Text API로 텍스트 추출
  const extractTextFromAudio = async (uri) => {
    try {
      console.log('extractTextFromAudio 호출됨, uri:', uri);
      if (!uri) {
        Alert.alert('오류', '녹음 파일이 없습니다.');
        return;
      }
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'audio/mp4',
        name: 'audio.m4a',
      });
      formData.append('model', 'whisper-1');
      formData.append('language', 'ko'); // 한글 인식
      console.log('API 요청 직전');
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: formData,
      });
      console.log('API 응답 대기중...');
      const result = await response.json();
      console.log('API 응답:', result);
      setExtractedText(result.text || '');
    } catch (error) {
      console.error('Error extracting text:', error);
      Alert.alert('오류', '음성 텍스트 추출 중 오류가 발생했습니다.');
    }
  };

  // 요청 제출
  const handleRequestSubmit = async () => {
    if (!extractedText.trim()) {
      Alert.alert('알림', '추출된 텍스트가 없습니다.');
      return;
    }
    try {
      await AsyncStorage.setItem('speakRequest', extractedText);
      Alert.alert('요청 완료', '요청이 성공적으로 제출되었습니다.');
      setExtractedText('');
    } catch (error) {
      console.error('Error saving request:', error);
      Alert.alert('오류', '요청 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.headerText}>
          Please record when, where, and{"\n"}what kind of help you need in detail
        </Text>
        <View style={styles.centerContainer}>
          <Image source={require('../Components/Images/waveform.png')} style={styles.waveform} />
          <TouchableOpacity style={styles.recordBtn} onPress={handleRecord}>
            <View style={[styles.recordCircle, isRecording && styles.recording]}>
              <View style={styles.innerCircle} />
            </View>
          </TouchableOpacity>
          <Text style={styles.extractedText}>
            {extractedText || 'Extracted text will appear here'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.requestBtn} onPress={handleRequestSubmit}>
            <LinearGradient
              colors={['#F5A623', '#FFE259']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.requestGradient}
            >
              <Text style={styles.requestBtnText}>Request!</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tryAgainBtn} onPress={() => {
            setExtractedText('');
            setAudioUri(null);
          }}>
            <LinearGradient
              colors={['#FFE259', '#F5A623']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tryAgainGradient}
            >
              <Text style={styles.tryAgainBtnText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {/* 하단 탭바 */}
      <View style={styles.bottomTabBar}>
        <LinearGradient
          colors={['#F5A623', '#FFE259']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.tabGradient}
        >
          <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('RequestListScreen')}>
            <Image source={require('../Components/Images/list-icon.png')} style={styles.tabIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('DPMain')}>
            <Image source={require('../Components/Images/heart-hands-icon.png')} style={styles.tabIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../Components/Images/profile-icon.png')} style={styles.tabIcon} resizeMode="contain" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 20 },
  mainContent: { flex: 1 },
  headerText: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 20, textAlign: 'center' },
  centerContainer: { alignItems: 'center', marginBottom: 20 },
  waveform: { width: 120, height: 60, marginBottom: 24, tintColor: '#333' },
  recordBtn: { marginBottom: 16 },
  recordCircle: {
    width: 72, height: 72, borderRadius: 36, borderWidth: 4, borderColor: '#333',
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
  },
  recording: { borderColor: '#F5A623', backgroundColor: '#FFF3E0' },
  innerCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F5A623' },
  extractedText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 16, textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  requestBtn: { width: '48%', borderRadius: 12, overflow: 'hidden' },
  requestGradient: { height: 56, alignItems: 'center', justifyContent: 'center' },
  requestBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  tryAgainBtn: { width: '48%', borderRadius: 12, overflow: 'hidden' },
  tryAgainGradient: { height: 56, alignItems: 'center', justifyContent: 'center' },
  tryAgainBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  bottomTabBar: { height: 100, borderTopLeftRadius: 0, borderTopRightRadius: 0 },
  tabGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 12 },
  tabBtn: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabIcon: { width: 80, height: 80 },
});
