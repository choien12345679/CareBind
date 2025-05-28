import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const activities = [
  {
    time: '14:00 Jun 15, 2025',
    name: 'Hyejin',
    desc: 'Accompany Hyejin to the district office and assist with paperwork.',
  },
  {
    time: '10:00 May 11, 2025',
    name: 'Mr. Choi',
    desc: 'Help Mr. Choi with grocery shopping at the local market.',
  },
  {
    time: '18:00 May 21, 2025',
    name: 'Minjae',
    desc: 'Attend a counseling session with Minjae and provide support.',
  },
];

export default function VolunteerActivitiesScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('currentUser');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setCurrentUser(parsedUserData);
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      }
    };

    getCurrentUser();
  }, []);

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedActivity(null);
  };

  // 탭 버튼 핸들러
  const handleRequestList = () => {
    navigation.navigate('History');
  };

  const handleCareService = () => {
    navigation.navigate('Matching');
  };

  const handleProfile = () => {
    // 현재 화면이므로 아무 동작 없음
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Components/Images/mainLogo.png')} style={styles.logo} />
      <Text style={styles.greeting}>
        <Text style={{fontWeight:'bold'}}>
          {currentUser ? currentUser.id : 'User'},{"\n"}thank you again today!
        </Text>
      </Text>
      <Text style={styles.sectionTitle}>Current Volunteer Activities</Text>
      <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
        {activities.map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.card} activeOpacity={0.85} onPress={() => openModal(item)}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.name}>Socially Disadvantaged : {item.name}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
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

      {/* 상세 모달 */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.detailCard}>
            <Image source={require('../Components/Images/mainLogo.png')} style={styles.modalLogo} />
            {selectedActivity && (
              <>
                <Text style={styles.modalTime}>{selectedActivity.time}</Text>
                <Text style={styles.modalName}>Socially Disadvantaged : {selectedActivity.name}</Text>
                <Text style={styles.modalDesc}>{selectedActivity.desc}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 100,
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 28,
    color: '#222',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
    width: '90%',
    fontWeight: 'bold',
    lineHeight: 34,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#6e6259',
    fontWeight: 'bold',
    marginBottom: 16,
    width: '90%',
    textAlign: 'left',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'flex-start',
  },
  time: {
    fontSize: 15,
    color: '#444',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    color: '#444',
    marginBottom: 2,
  },
  desc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  bottomTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#F5A623',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCard: {
    width: 320,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  modalLogo: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  modalTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 8,
  },
  modalName: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  modalDesc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
  },
  closeBtn: {
    marginTop: 12,
    backgroundColor: '#FFD580',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9900',
  },
});
