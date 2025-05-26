import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import BottomNav from '../Components/BottomNav';

const history = [
  {
    time: '18:00 May 12, 2025',
    volunteer: 'Alex',
    content: 'Go to the bank together(OO Bank)',
  },
  {
    time: '15:15 May 11, 2026',
    volunteer: 'Jeny',
    content: 'Replace a light bulb',
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

export default function HistoryScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const openModal = (item) => {
    setSelectedHistory(item);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedHistory(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Reservation History</Text>
      <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
        {history.map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.card} activeOpacity={0.85} onPress={() => openModal(item)}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.volunteer}>Volunteer: {item.volunteer}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav navigation={navigation} active="list" />
      {/* 상세 모달 */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.detailCard}>
            {selectedHistory && (
              <>
                <Text style={styles.modalTime}>{selectedHistory.time}</Text>
                <Text style={styles.modalVolunteer}>Volunteer: {selectedHistory.volunteer}</Text>
                <Text style={styles.modalContent}>{selectedHistory.content}</Text>
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
    paddingTop: 48,
    paddingBottom: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 24,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  volunteer: {
    fontSize: 15,
    color: '#444',
    marginBottom: 2,
  },
  content: {
    fontSize: 15,
    color: '#444',
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
  modalTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 8,
  },
  modalVolunteer: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  modalContent: {
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