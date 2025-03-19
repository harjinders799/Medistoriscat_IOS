import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFontSize } from '../utils';
import { createRStyle, useResponsiveMethods } from 'react-native-full-responsive';

const window = Dimensions.get('window');

const WellcomeScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);  // Show loading indicator during the check
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        navigation.replace('HomeScreen');  // Navigate to Home if logged in
      } else {
        navigation.replace('Login');  // Navigate to Login if not logged in
      }
    } catch (error) {
      console.error('Error checking the session state.', error);
      navigation.replace('Login');  // Fallback to Login on error
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  return (
    <LinearGradient colors={['#d9d600', '#760075']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={require('../images/logo2.webp')} style={styles.logo} />
        <Text style={styles.title}>Cultura Catalana immersiva</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.txt}>Entra</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = createRStyle({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5rs',
    width: '100%'
  },
  logo: {
    width: '50%',
    height: window.height * 0.2,
    resizeMode: 'contain',
    marginBottom: '5rs'
  },
  title: {
    fontSize: '14rs',
    color: '#ffffff',
    marginBottom: '5%'
  },
  button: {
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: window.height * 0.015,
    paddingHorizontal: '10%',
    alignItems: 'center',
    width: '80%',
  },
  txt:{ color: 'white',fontSize:'10rs' }
});
export default WellcomeScreen;
