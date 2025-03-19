/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFontSize } from '../utils';
import { useResponsiveMethods } from 'react-native-full-responsive';




const LoginScreen = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Tots dos, el correu electrònic i la contrasenya, són obligatoris!');
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        // Store user token or UID
        await AsyncStorage.setItem('userToken', user.uid);  // Store UID or token
        navigation.navigate('HomeScreen');  // Navigate to home screen
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Inici de sessió fallit! Si us plau, introdueix les dades correctes.');
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center' }}>
      <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
        <View style={{ marginVertical: 22, width: '100%' }}>
          <Text
            style={{
              fontSize: rs(20),
              fontWeight: 'bold',
              marginVertical: 12,
              color: 'black',
            }}>
            Inicia sessió
          </Text>

          <Text
            style={{
              fontSize: rs(14),
              color: 'black',
            }}>
            Ens alegrem de tornar-te a veure 👋
          </Text>
        </View>

        <View style={{ marginBottom: 12, marginTop: 20 }}>
          <View
            style={{
              width: '100%',
              // height: 50,
              height: rs(40),
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Correu Electrònic"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={{
                width: '100%',
                fontSize: rs(14),
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12, marginTop: 20, }}>
          <View
            style={{
              width: '100%',
              height: rs(40),
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
              width: '100%'
            }}>
            <TextInput
              placeholder="Contrasenya"
              secureTextEntry={!isPasswordShown}
              value={password}
              onChangeText={setPassword}
              style={{
                width: '100%',
                fontSize: rs(14),
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {isPasswordShown == false ? (
                <Ionicons name="eye-off" size={rs(24)} color={"blak"} />
              ) : (
                <Ionicons name="eye" size={rs(24)} color={"black"} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
            <Text
              style={{
                fontSize: rs(15),
                color: '#007260',
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Restablir la contrasenya
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <TouchableOpacity style={styles.Button} onPress={handleLogin} >
            <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: rs(18)}}>Inicia sessió</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Text style={{ fontSize: rs(14), color: 'black' }}>No tens compte</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: rs(14),
                color: '#007260',
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Crea compte
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width:'100%' ,
    marginTop: 18,
    marginBottom: 4,
    // height: 52,
    justifyContent: 'center', alignItems: 'center',

  },
});
export default LoginScreen;
