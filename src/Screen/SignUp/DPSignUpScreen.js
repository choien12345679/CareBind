import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function DPSignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    address: '',
    birth: '',
    phoneNumber: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  // 입력값 변경 핸들러
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 이미지 선택 함수
  const pickImage = async () => {
    // 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access camera roll is required!");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // 데이터 저장 함수
  const saveUserData = async () => {
    try {
      // 입력값 유효성 검사
      if (!formData.id || !formData.password || !formData.address || 
          !formData.birth || !formData.phoneNumber) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      // 기존에 저장된 사용자 유형 정보 가져오기
      const selectedUserTypeData = await AsyncStorage.getItem('selectedUserType');
      let userType = 'DP'; // 기본값
      
      if (selectedUserTypeData) {
        const parsedUserTypeData = JSON.parse(selectedUserTypeData);
        userType = parsedUserTypeData.userType;
      }

      // 사용자 데이터 객체 생성
      const userData = {
        ...formData,
        profileImage: profileImage,
        userType: userType, // SignUpSelectScreen에서 저장된 유형 사용
        createdAt: new Date().toISOString()
      };

      // AsyncStorage에 저장
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // 설문조사 화면으로 이동 (회원가입 완료가 아님)
      navigation.navigate('DPSurvey');
      
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert("Error", "Failed to save data");
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image URI:', result.uri); // 이미지 URI 확인
      setProfileImage(result.uri);
      await extractTextFromImage(result.uri); // 텍스트 추출
    } else {
      console.log('Image capture was canceled');
    }
  };

  const extractTextFromImage = async (uri) => {
    if (!uri) {
      console.error('Image URI is null');
      Alert.alert("오류", "이미지 URI가 유효하지 않습니다.");
      return;
    }

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
      const detectedText = result.responses[0].fullTextAnnotation.text;
      setExtractedText(detectedText);
    } catch (error) {
      console.error('Error extracting text:', error);
      Alert.alert("오류", "텍스트 추출 중 오류가 발생했습니다.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 프로필 이미지 */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Image 
              source={require('../../Components/Images/camera-icon.png')} 
              style={styles.cameraIcon}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* ID 입력 */}
      <TextInput
        style={styles.input}
        placeholder="ID"
        placeholderTextColor="#999"
        value={formData.id}
        onChangeText={(value) => handleInputChange('id', value)}
      />

      {/* PassWord 입력 */}
      <TextInput
        style={styles.input}
        placeholder="PassWord"
        placeholderTextColor="#999"
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry
      />

      {/* Address 입력 */}
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#999"
        value={formData.address}
        onChangeText={(value) => handleInputChange('address', value)}
      />

      {/* Birth 입력 */}
      <TextInput
        style={styles.input}
        placeholder="Birth"
        placeholderTextColor="#999"
        value={formData.birth}
        onChangeText={(value) => handleInputChange('birth', value)}
      />

      {/* Phone-Number 입력 */}
      <TextInput
        style={styles.input}
        placeholder="Phone-Number"
        placeholderTextColor="#999"
        value={formData.phoneNumber}
        onChangeText={(value) => handleInputChange('phoneNumber', value)}
        keyboardType="phone-pad"
      />

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.submitBtn} onPress={saveUserData}>
        <LinearGradient
          colors={['#F5A623', '#FFE259']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.submitBtnText}>Please take the survey!</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  imageContainer: {
    marginBottom: 40,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: '#999',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  submitBtn: {
    width: '100%',
    borderRadius: 25,
    marginTop: 20,
    overflow: 'hidden',
  },
  gradient: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
