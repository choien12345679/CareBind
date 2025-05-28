import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BottomNav({ navigation, active }) {
  return (
    <View style={styles.bottomTabBar}>
      <LinearGradient
        colors={['#F5A623', '#FFE259']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tabGradient}
      >
        <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('History')}>
          <Image 
            source={require('./Images/list-icon.png')} 
            style={styles.tabIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('Matching')}>
          <Image 
            source={require('./Images/heart-hands-icon.png')} 
            style={styles.tabIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('Main')}>
          <Image 
            source={require('./Images/profile-icon.png')} 
            style={styles.tabIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
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
}); 