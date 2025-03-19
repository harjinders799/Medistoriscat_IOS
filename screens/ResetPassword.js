import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { getFontSize } from '../utils';
import { useResponsiveMethods } from 'react-native-full-responsive';

const ResetPassword = ({ navigation }) => {
  const { rs, rw, rh } = useResponsiveMethods();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address!');
      return;
    }
    try {
      auth().languageCode = 'ca';
      // Send password reset email
      await auth().sendPasswordResetEmail(email);
      Alert.alert('ha enviat un correu electrònic per restablir la contrasenya a la teva adreça de correu electrònic.');
      navigation.navigate('Login'); // Redirect back to login screen after requesting password reset
    } catch (error) {
      console.error(error);
      Alert.alert('Error, no s ha pogut enviar l email de restabliment de contrasenya. Si us plau, intenta-ho més tard');
    }
  };


  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>

        <Text style={[styles.title,{fontSize:rs(20)}]}>Restablir Contrasenya</Text>
        <Text style={[styles.description,{fontSize:rs(14)}]}>
          Introdueix el teu correu electrònic i rebràs instruccions
          per restablir la contrasenya.
        </Text>

        <View style={[styles.inputContainer,{height:rs(40)}]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"black"}
            keyboardType="email-address"
            style={[styles.input,{fontSize:rs(14)}]}
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
          />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity style={styles.Button} onPress={handlePasswordReset}>
            <Text style={{ color: 'white',    fontSize: rs(18), }}>Continuar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: 'center',
    marginVertical: 22,
  },
  title: {
    fontSize: getFontSize(22),
    fontWeight: 'bold',
    marginVertical: 12,
    color: "black",
  },
  description: {
    color: "black",
    fontSize: getFontSize(16),
  },
  inputContainer: {
    width: '100%',
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    marginTop: 20,
  },
  input: {
    height: getFontSize(50),
    width: '100%',
    fontSize: getFontSize(16),

  },
  Button: {
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
    fontSize: getFontSize(22),
  },
});

export default ResetPassword;
