import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  StatusBar,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestListScreen({ navigation }) {
  const [userName, setUserName] = useState('Grace');

  // 더미 데이터
  const requestList = [
    {
      id: 1,
      time: '18:00 May 12, 2025',
      volunteer: 'Alex',
      content: 'Go to the bank together...',
      status: 'View Details'
    },
    {
      id: 2,
      time: '15:15 May 11, 2025',
      volunteer: 'Mr. Choi',
      content: 'Grocery shopping at E...',
      status: 'View Details'
    },
    {
      id: 3,
      time: '17:20 May 21, 2025',
      volunteer: 'Minjae',
      content: 'Attend a counseling sessio...',
      status: 'View Details'
    }
  ];

  useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('completeUserData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.id) {
          setUserName(userData.id);
        }
      }
    } catch (error) {
      console.error('사용자 이름 로드 실패:', error);
    }
  };

  // 탭 버튼 핸들러
  const handleRequestList = () => {
    // 현재 화면이므로 아무것도 하지 않음
  };

  const handleCareService = () => {
    navigation.navigate('DPMain');
  };

  const handleProfile = () => {
    // 프로필 화면으로 이동 (추후 구현)
    console.log('프로필 화면으로 이동');
  };

  const handleViewDetails = (item) => {
    console.log('상세보기:', item);
    // 상세보기 화면으로 이동 (추후 구현)
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* 상단 로고 */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../Components/Images/mainLogo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* 인사말 */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingName}>{userName},</Text>
          <Text style={styles.greetingMessage}>thank you again today!</Text>
        </View>

        {/* 현재 자원봉사 활동 제목 */}
        <Text style={styles.sectionTitle}>Current Volunteer Activities</Text>

        {/* 요청 목록 */}
        <View style={styles.listContainer}>
          {requestList.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View style={styles.itemContent}>
                <Text style={styles.itemTime}>{item.time}</Text>
                <Text style={styles.itemVolunteer}>Volunteer : {item.volunteer}</Text>
                <Text style={styles.itemDescription}>{item.content}</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewDetailsBtn}
                onPress={() => handleViewDetails(item)}
              >
                <Text style={styles.viewDetailsBtnText}>{item.status}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5A623',
    letterSpacing: 2,
  },
  greetingContainer: {
    marginBottom: 30,
  },
  greetingName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  greetingMessage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemVolunteer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  viewDetailsBtn: {
    backgroundColor: '#F5A623',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewDetailsBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
