import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFontSize } from '../utils';
import { useResponsiveMethods } from 'react-native-full-responsive';

const ProfileScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();


  const onLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userToken');  // Ensure session token is removed
      Alert.alert("Has tancat la sessió correctament.");
      setTimeout(() => navigation.navigate('Login'), 500);  // Navigate to Login after logout
    } catch (error) {
      console.log('error', error);
      Alert.alert("No s'ha pogut tancar la sessió. No has iniciat sessió.");
    }
  };





  const onDeleteAccount = () => {
    Alert.alert(
      'Eliminar compte',
      'Estàs segur que vols eliminar el teu compte permanentment?',
      [
        {
          text: 'Cancel·lar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const user = auth().currentUser;
              if (user) {
                await user.delete();
                Alert.alert('Compte eliminat', 'El teu compte ha estat eliminat correctament.');
                // Optionally, navigate to login screen after deletion
                navigation.replace('Login');
              }
            } catch (error) {
              if (error.code === 'auth/requires-recent-login') {
                Alert.alert(
                  'Error',
                  'Per eliminar el compte, torna a iniciar sessió i prova-ho de nou.'
                );
                // Re-authentication logic can go here if needed
              } else {
                Alert.alert('Error', 'No s\'ha pogut eliminar el compte. Torna-ho a provar.');
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
  };





  return (
    <LinearGradient colors={["#d9d600", "#760075"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
        <StatusBar translucent backgroundColor={"transparent"} barStyle='light-content' />

        <View style={styles.header}>
          <Ionicons name='person-circle-outline' size={rs(70)} color='white' />
          <Text style={{ fontSize: rs(32), fontWeight: '600', Merginbuttom: 6, color: 'white', marginTop: 10, }}>Perfil</Text>

          <View>
            <TouchableOpacity style={[styles.Button,{ width:rw(80)}]} onPress={onDeleteAccount} >
              <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: rs(18) }}>suprimeix el teu compte</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={[styles.Button,{ width:rw(80)}]} onPress={onLogout} >
            <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: rs(18) }}>tancar sessió</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>

  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15, marginTop: 50, alignItems: 'center',  // Horizontal centering
    justifyContent: 'center',
  },
  Button: {
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    // width: getFontSize(350),
    marginTop: 18,
    marginBottom: 4,
    // height: 52,
    justifyContent: 'center', alignItems: 'center',

  },
})