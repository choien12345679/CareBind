import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from '../Components/BottomNav';

const cardData = [
  {
    name: 'Grace, 81',
    time: '09:00 Jun 15, 2025',
    disability: 'Blind',
    task: 'Go to the bank\ntogether(OO Bank)',
    location: 'L.A',
    distance: 'Distance : 3km',
    profile: require('../../assets/profile_1.png'),
  },
  {
    name: 'John, 75',
    time: '14:00 Jun 16, 2025',
    disability: 'Deaf',
    task: 'Visit hospital',
    location: 'NY',
    distance: 'Distance : 2km',
    profile: require('../../assets/profile_2.png'),
  },
  // 필요시 더 추가
];

const reservationHistory = [
  {
    time: '18:00 May 12, 2025',
    volunteer: 'Alex',
    content: 'Go to the bank together(OO Bank)',
    profile: require('../../assets/profile_1.png'),
    disability: 'Blind',
    location: 'L.A',
    distance: 'Distance : 3km',
  },
  {
    time: '15:15 May 11, 2026',
    volunteer: 'Jeny',
    content: 'Replace a light bulb',
    profile: require('../../assets/profile_2.png'),
    disability: 'Deaf',
    location: 'NY',
    distance: 'Distance : 2km',
  },
  {
    time: '17:20 May 9, 2026',
    volunteer: 'Alex',
    content: 'Help with grocery shopping',
  },
  {
    time: '13:00 May 7, 2026',
    volunteer: 'Chris',
    content: 'Read a government notice aloud',
  },
  {
    time: '14:20 May 5, 2026',
    volunteer: 'Jeny',
    content: 'Fix the TV remote control',
  },
  {
    time: '12:20 May 4, 2026',
    volunteer: 'Jeny',
    content: 'Help install a gas alarm',
  },
];

const MatchingScreen = ({ navigation }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isMatched, setIsMatched] = useState(false);

  const handleNextCard = () => {
    setCardIndex((prev) => prev + 1);
  };

  const handleAccept = () => {
    if (card) {
      setMatchedCards(prev => [...prev, { ...card, status: 'accepted' }]);
      setIsMatched(true);
    }
  };

  const handleDecline = () => {
    if (card) {
      setMatchedCards(prev => [...prev, { ...card, status: 'declined' }]);
      handleNextCard();
    }
  };

  const card = cardData[cardIndex];

  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/carebind_logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* 매칭 카드 */}
      {isMatched ? (
        <View style={styles.matchingBox}>
          <Text style={styles.matchingText}>You are matched with this person</Text>
          <LinearGradient colors={["#FFD580", "#FFB347"]} style={styles.card}>
            <Image source={require('../../assets/carebind_logo.png')} style={styles.cardLogo} />
            <Image source={card.profile} style={styles.profileImage} />
            <Text style={styles.name}>{card.name}</Text>
            <Text style={styles.info}>{card.time}</Text>
            <Text style={styles.info}>{card.disability}</Text>
            <Text style={styles.info}>{card.task}</Text>
            <Text style={styles.info}>{card.location}</Text>
            <Text style={styles.info}>{card.distance}</Text>
          </LinearGradient>
        </View>
      ) : card ? (
        <>
          <LinearGradient colors={["#FFD580", "#FFB347"]} style={styles.card}>
            <Image source={require('../../assets/carebind_logo.png')} style={styles.cardLogo} />
            <Image source={card.profile} style={styles.profileImage} />
            <Text style={styles.name}>{card.name}</Text>
            <Text style={styles.info}>{card.time}</Text>
            <Text style={styles.info}>{card.disability}</Text>
            <Text style={styles.info}>{card.task}</Text>
            <Text style={styles.info}>{card.location}</Text>
            <Text style={styles.info}>{card.distance}</Text>
          </LinearGradient>
          {/* 승인/거절 버튼 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.declineButton} onPress={handleDecline} disabled={!card}>
              <Text style={styles.buttonText}>✗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept} disabled={!card}>
              <Text style={styles.buttonText}>✓</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.noMatchBox}>
          <Text style={styles.noMatchText}>No more matches available</Text>
        </View>
      )}

      {/* 하단 네비게이션 */}
      <BottomNav navigation={navigation} onListPress={() => setModalVisible(true)} />

      {/* 리스트 모달 */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          {selectedReservation ? (
            <View style={styles.profileModalBox}>
              <LinearGradient colors={["#FFD580", "#FFB347"]} style={styles.card}>
                <Image source={require('../../assets/carebind_logo.png')} style={styles.cardLogo} />
                <Image source={selectedReservation.profile} style={styles.profileImage} />
                <Text style={styles.name}>{selectedReservation.volunteer}</Text>
                <Text style={styles.info}>{selectedReservation.time}</Text>
                <Text style={styles.info}>{selectedReservation.disability}</Text>
                <Text style={styles.info}>{selectedReservation.content}</Text>
                <Text style={styles.info}>{selectedReservation.location}</Text>
                <Text style={styles.info}>{selectedReservation.distance}</Text>
              </LinearGradient>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedReservation(null)}>
                <Text style={styles.closeBtnText}>닫기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.historyBox}>
              <Text style={styles.historyTitle}>View Reservation History</Text>
              <ScrollView contentContainerStyle={styles.historyScroll} showsVerticalScrollIndicator={false}>
                {reservationHistory.map((item, idx) => (
                  <TouchableOpacity key={idx} style={styles.historyCard} onPress={() => setSelectedReservation(item)}>
                    <Text style={styles.historyTime}>{item.time}</Text>
                    <Text style={styles.historyVolunteer}>Volunteer: {item.volunteer}</Text>
                    <Text style={styles.historyContent}>{item.content}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtnText}>닫기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  card: {
    width: 300,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardLogo: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 12,
    marginTop: 12,
    alignSelf: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  info: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
    marginTop: 12,
    marginBottom: 12,
  },
  declineButton: {
    backgroundColor: '#FF4D4D',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#FFD580',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 48,
    marginTop: 0,
    paddingBottom: 0,
  },
  navIcon: {
    width: 56,
    height: 56,
  },
  navLogo: {
    width: 72,
    height: 72,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyBox: {
    width: 340,
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  historyTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 18,
    alignSelf: 'flex-start',
  },
  historyScroll: {
    paddingBottom: 12,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    padding: 14,
    marginBottom: 14,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  historyTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  historyVolunteer: {
    fontSize: 15,
    color: '#444',
    marginBottom: 2,
  },
  historyContent: {
    fontSize: 15,
    color: '#444',
  },
  closeBtn: {
    marginTop: 24,
    backgroundColor: '#FFD580',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'center',
  },
  closeBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9900',
  },
  profileModalBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 340,
    maxWidth: '90%',
    alignSelf: 'center',
  },
  noMatchBox: {
    marginTop: 100,
    marginBottom: 32,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  noMatchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  matchingBox: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  matchingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 18,
  },
});

export default MatchingScreen; 