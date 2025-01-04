/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */

import React,{useState} from 'react';
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




const LoginScreen =  ({navigation}) => {
  
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
  

  async function onGoogleButtonPress() {
      GoogleSignin.configure({
          webClientId: '964940426884-e18dsdv6f6j6cafgohnoi9lcmkvcln02.apps.googleusercontent.com',
        });
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const response = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(
          response?.data?.idToken,
        );
        console.log(auth().signInWithCredential(googleCredential));
        return auth().signInWithCredential(googleCredential);
    }

      async function _signInWithGoogle() {
        const user = await onGoogleButtonPress();
  
      if (user) {
        await AsyncStorage.setItem('userToken', user.user.uid);  // Store UID or token
        console.log(user);
        navigation.navigate("HomeScreen");
      }
    }


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, marginHorizontal: 22,}}>
        <View style={{marginVertical: 22,}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: 'black',
            }}>
            Inicia sessió
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: 'black',
            }}>
            Ens alegrem de tornar-te a veure 👋
          </Text>
        </View>

        <View style={{marginBottom: 12, marginTop: 20}}>
          <View
            style={{
              width: '100%',
              height: 50,
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
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 12, marginTop: 20}}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Contrasenya"
              secureTextEntry={!isPasswordShown}
              value={password}
              onChangeText={setPassword}
              style={{
                width: '100%',
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {isPasswordShown == false ? (
              <Ionicons name="eye-off" size={24} color={"blak"} />
            ) : (
              <Ionicons name="eye" size={24} color={"black"} />
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
           <TouchableOpacity onPress={()=> navigation.navigate("ResetPassword")}>
            <Text
              style={{
                fontSize: 19,
                color: '#007260',
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Restablir la contrasenya
            </Text>
            </TouchableOpacity>
        </View>

    <View style={{ justifyContent: 'center',alignItems: 'center',}}>
              <TouchableOpacity style={styles.Button} onPress={handleLogin} >
                    <Text style={{color:'white',justifyContent: 'center',alignItems: 'center',fontSize: 18}}>Inicia sessió</Text>
              </TouchableOpacity>
    </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: 'black',
              marginHorizontal: 10,
            }}
          />
          <Text style={{fontSize: 14}}>O inicia sessió amb</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: 'black',
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
           onPress={() => _signInWithGoogle()}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: 'black',
              marginRight: 4,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png',
              }}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginLeft: 16,
                fontWeight: '400',
              }}>
              Entra amb google
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Text style={{fontSize: 16, color: 'black'}}>No tens compte</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
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
  Button:{
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width:350,
    marginTop: 18,
    marginBottom: 4,
    height:52,
    justifyContent: 'center',alignItems: 'center',
   
  },
});
export default LoginScreen;
