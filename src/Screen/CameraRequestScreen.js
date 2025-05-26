import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import apiKey from '../Components/Warning/key'; // 경로가 올바른지 확인

export default function CameraRequestScreen({ navigation }) {
  const [extractedText, setExtractedText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Google Cloud Vision API를 사용하여 텍스트 추출
  const extractTextFromImage = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                },
              ],
            },
          ],
        }),
      });

      const result = await response.json();
      console.log('Vision API result:', JSON.stringify(result, null, 2));

      if (result.responses?.[0]?.error) {
        console.error('Vision API Error:', result.responses[0].error);
        Alert.alert("오류", "Vision API 오류: " + result.responses[0].error.message);
        return;
      }

      const detectedText = result.responses?.[0]?.fullTextAnnotation?.text || '';
      setExtractedText(detectedText);
    } catch (error) {
      console.error('Error extracting text:', error);
      Alert.alert("오류", "텍스트 추출 중 오류가 발생했습니다.");
    }
  };

  // 카메라로 사진 찍기
  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    console.log('Image Picker Result:', result); // 구조 확인

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log('Image URI:', uri);
      setImageUri(uri);
      await extractTextFromImage(uri);
    } else {
      console.log('Image capture was canceled or no asset returned');
      Alert.alert("오류", "이미지 촬영에 실패했습니다.");
    }
  };

  // 요청 제출
  const handleRequestSubmit = async () => {
    if (!extractedText.trim()) {
      Alert.alert("알림", "추출된 텍스트가 없습니다.");
      return;
    }

    try {
      await AsyncStorage.setItem('cameraRequest', extractedText);
      Alert.alert("요청 완료", "요청이 성공적으로 제출되었습니다.");
      setExtractedText('');
    } catch (error) {
      console.error('Error saving request:', error);
      Alert.alert("오류", "요청 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* 상단 텍스트 */}
        <Text style={styles.headerText}>Please describe when, where, and what kind of help you need</Text>

        {/* 이미지 미리보기 */}
        <View style={styles.imagePreviewContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.placeholderText}>No image taken</Text>
          )}
        </View>

        {/* 추출된 텍스트 확인 */}
        <Text style={styles.confirmText}>Is the message you wrote below correct?</Text>
        <Text style={styles.extractedText}>{extractedText || 'Extracted text will appear here'}</Text>

        {/* 요청 버튼 */}
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
          <TouchableOpacity style={styles.tryAgainBtn} onPress={handleTakePhoto}>
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
            <Image 
              source={require('../Components/Images/list-icon.png')} 
              style={styles.tabIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('DPMain')}>
            <Image 
              source={require('../Components/Images/heart-hands-icon.png')} 
              style={styles.tabIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('Profile')}>
            <Image 
              source={require('../Components/Images/profile-icon.png')} 
              style={styles.tabIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    color: '#999',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F5A623',
    marginBottom: 10,
  },
  extractedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  requestBtn: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  requestGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tryAgainBtn: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tryAgainGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tryAgainBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomTabBar: {
    height: 100,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  tabGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    width: 80,
    height: 80,
  },
}); 