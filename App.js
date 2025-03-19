import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import WellcomeScreen from './screens/WellcomeScreen';
import SignupScreen from './screens/SignupScreen';
import ResetPassword from './screens/ResetPassword';
import HomeScreen from './screens/HomeScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import HistoriesSongsListScreen from './screens/HistoriesSongsListScreen';
import HistoriesSongPlayScreen from './screens/HistoriesSongPlayScreen';
import LegendsSongsListScreen from './screens/LegendsSongsListScreen';
import LegendsSongsPlayScreens from './screens/LegendsSongsPlayScreens';
import DitesSongsListScreen from './screens/DitesSongsListScreen';
import DitesSongsPlayScreen from './screens/DitesSongsPlayScreen';
import CanConsSongsPlayScreen from './screens/CanConsSongsPlayScreen';
import CanconsSongsListScreen from './screens/CanconsSongsListScreen';
import AllSongsListScreen from './screens/AllSongsListScreen';
import AllSongsPlayScreen from './screens/AllSongsPlayScreen';
import ProfileScreen from './screens/ProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FRProvider, useMediaQuery } from 'react-native-full-responsive';



const Stack = createStackNavigator();
const customThresholds = {
  // 'xs':768 ,992,1200,
  'sm':992 ,
  'md':1200 ,
};

const App = () => {
  const type = useMediaQuery(customThresholds);

  return (
    <FRProvider type={type}>
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wellcome">

        <Stack.Screen name="Wellcome" component={WellcomeScreen} options={{ headerShown: false }}/>
        
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
        
        
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ headerShown: false }} />
       
        <Stack.Screen name='HistoriesSongsListScreen' component={HistoriesSongsListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HistoriesSongPlayScreen" component={HistoriesSongPlayScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="LegendsSongsListScreen" component={LegendsSongsListScreen} options={{ headerShown: false }}/>
       <Stack.Screen  name ='LegendsSongsPlayScreens' component={LegendsSongsPlayScreens} options={{ headerShown: false }}/>
       
       
        <Stack.Screen name="DitesSongsListScreen" component={DitesSongsListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='DitesSongsPlayScreen' component={DitesSongsPlayScreen} options={{ headerShown: false }} />
        
        
        <Stack.Screen name='CanconsSongsListScreen' component={CanconsSongsListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CanConsSongsPlayScreen" component={CanConsSongsPlayScreen}  options={{ headerShown: false }}/>
        
        
        <Stack.Screen name="AllSongsListScreen" component={AllSongsListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AllSongsPlayScreen" component={AllSongsPlayScreen} options={{ headerShown: false }}/>
       
     
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </FRProvider>
  );
};

export default App;
