/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  width, Alert
} from "react-native";
import Checkbox from "@react-native-community/checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_APP_ID, GOOGLE_SIGNIN_WEB_CLINT_ID } from '@env';
import { getFontSize } from "../utils";
import { useResponsiveMethods } from "react-native-full-responsive";




const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();  // If Firebase is already initialized
}

const SignupScreen = ({ navigation, route }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const registerUser = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Tots els camps són obligatoris!');
      return;
    }

    try {
      auth().languageCode = 'ca';
      // Firebase Auth Registration
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save additional user info (e.g., name) in Firebase Firestore
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      await userRef.set({
        name: name,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });


      // Show success alert
      Alert.alert('Benvingut!', 'El registre s\'ha completat correctament!', [
        {
          text: 'D\'acord',
          onPress: () => navigation.navigate('HomeScreen'),
        },
      ]);




    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };


  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onGoogleButtonPress() {
    GoogleSignin.configure({
      webClientId: GOOGLE_SIGNIN_WEB_CLINT_ID,
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
    console.log(user);
    navigation.navigate("HomeScreen");
  }





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center' }}>
      <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: rs(22),
              fontWeight: "bold",
              marginVertical: 12,
              color: "black",
            }}
          >
            Registra't
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: rs(40),
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Nom d'usuari"
              placeholderTextColor={"black"}
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                width: "100%",
                fontSize: rs(14),
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12, marginTop: 20 }}>
          <View
            style={{
              width: "100%",
              height: rs(40),
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Correu Electrònic"
              placeholderTextColor={"black"}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              style={{
                width: "100%",
                fontSize: rs(14),

              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12, marginTop: 20 }}>
          <View
            style={{
              width: "100%",
              height: rs(40),
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Contrasenya"
              placeholderTextColor={"black"}
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                width: "100%",
                fontSize: rs(14),

              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              <Ionicons
                name={isPasswordShown ? "eye-off" : "eye"}
                size={rs(24)}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 5, transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "red" : undefined}
          />

          <Text
            style={{
              width: '100%', fontSize: rs(14),
            }}
            onPress={() =>
              navigation.navigate("PrivacyScreen", { isChecked: isChecked })
            }
          >
            En fer clic a Registre, accepteu els nostres termes, privadesa i
            política i acord d'usuari
          </Text>
        </View>

        <TouchableOpacity onPress={registerUser} disabled={!isChecked}
          style={{
            backgroundColor: '#5c10b2',
            borderRadius: 8,
            paddingVertical: 13,
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 20,
            width: '100%',
            marginTop: 18,
            marginBottom: 4,
            // height: 52,
            justifyContent: 'center', alignItems: 'center',

          }}
        >
          <Text style={{ color: "white", fontSize: rs(18) }}>Registra't</Text>
        </TouchableOpacity>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "grey",
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>O registra't amb</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "grey",
              marginHorizontal: 10,
            }}
          />
        </View> */}



        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
        
            <TouchableOpacity  onPress={() => _signInWithGoogle()}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: "grey",
                marginRight: 4,
                borderRadius: 10,
                backgroundColor: "white",
              }}
           >
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
                  color: "black",
                  marginLeft: 16,
                  fontWeight: "400",
                }}
              >
                Entra amb google
              </Text>
            </TouchableOpacity>
         

        </View> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: rs(14), color: "black" }}>
            Si tens un compte
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: rs(14),
                color: "#007260",
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Inicia sessió
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen;
