import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomNav({ navigation, active }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Image source={require('./Images/list_icon.png')} style={[styles.navIcon, active === 'list' && styles.active]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Matching')}>
        <Image source={require('../../assets/carebind_logo.png')} style={styles.navLogo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Image source={require('./Images/profile_icon.png')} style={[styles.navIcon, active === 'profile' && styles.active]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#FFD580',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 48,
    marginTop: 0,
    paddingBottom: 0,
  },
  navIcon: {
    width: 70,
    height: 70,
    opacity: 0.7,
  },
  navLogo: {
    width: 70,
    height: 70,
    opacity: 0.7,
  },
  active: {
    opacity: 1,
  },
}); 