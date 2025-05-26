import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  StatusBar,
  Alert,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DPMainScreen({ navigation }) {
  const [requestText, setRequestText] = useState('');

  // 카메라로 손글씨 인식
  const handleSnapHandwriting = () => {
    navigation.navigate('CameraRequest');
  };

  // 음성 요청
  const handleSpeakRequest = () => {
    navigation.navigate('SpeakRequest');
  };

  // 텍스트 요청 제출
  const handleTextRequest = () => {
    if (!requestText.trim()) {
      Alert.alert("알림", "요청 내용을 입력해주세요.");
      return;
    }
    
    Alert.alert(
      "요청 제출", 
      `다음 요청이 제출되었습니다:\n"${requestText}"`,
      [
        { text: "확인", onPress: () => setRequestText('') }
      ]
    );
  };

  // 탭 버튼 핸들러
  const handleRequestList = () => {
    navigation.navigate('RequestListScreen');
  };

  const handleCareService = () => {
    navigation.navigate('DPMain');
  };

  const handleProfile = () => {
    Alert.alert("알림", "프로필 화면이 곧 추가됩니다.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 메인 컨텐츠 */}
      <View style={styles.mainContent}>
        
        {/* 상단 버튼들 */}
        <View style={styles.topButtonsContainer}>
          {/* 손글씨 인식 버튼 */}
          <TouchableOpacity style={styles.topBtn} onPress={handleSnapHandwriting}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../Components/Images/camera-icon-main.png')} 
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.topBtnText}>Snap your{'\n'}handwriting{'\n'}to request</Text>
          </TouchableOpacity>

          {/* 음성 요청 버튼 */}
          <TouchableOpacity style={styles.topBtn} onPress={handleSpeakRequest}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../Components/Images/microphone-icon.png')} 
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.topBtnText}>Speak{'\n'}to request</Text>
          </TouchableOpacity>
        </View>

        {/* 텍스트 입력 섹션 */}
        <View style={styles.textSection}>
          <Text style={styles.textLabel}>Text to request</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Text here..."
            placeholderTextColor="#999"
            value={requestText}
            onChangeText={setRequestText}
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        {/* 요청 버튼 */}
        <TouchableOpacity style={styles.requestBtn} onPress={handleTextRequest}>
          <LinearGradient
            colors={['#F5A623', '#FFE259']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.requestGradient}
          >
            <Text style={styles.requestBtnText}>Request!</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 하단 탭바 */}
      <View style={styles.bottomTabBar}>
        <LinearGradient
          colors={['#F5A623', '#FFE259']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.tabGradient}
        >
          <TouchableOpacity style={styles.tabBtn} onPress={handleRequestList}>
            <Image 
              source={require('../Components/Images/list-icon.png')} 
              style={styles.tabIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabBtn} onPress={handleCareService}>
            <Image 
              source={require('../Components/Images/heart-hands-icon.png')} 
              style={styles.tabIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabBtn} onPress={handleProfile}>
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
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 62,
  },
  topBtn: {
    width: '48%',
    height: 160,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 100,
    height: 100,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  topBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
  },
  textSection: {
    marginBottom: 24,
  },
  textLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestBtn: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  requestGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
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