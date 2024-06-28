import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.jsx';
import PetunjukPenggunaan from './screens/PetunjukPenggunaan.jsx';
import SurveyScreen from './screens/SurveyScreen.jsx';
import ResultScreen from './screens/ResultScreen.jsx';
import ProfilGuru from './screens/Profil/ProfilGuru.jsx';
import ProfilSiswa from './screens/Profil/ProfilSiswa.jsx';
import Mode from './screens/Mode.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="PetunjukPenggunaan" component={PetunjukPenggunaan} />
        <Stack.Screen name="Mode" component={Mode} />
        <Stack.Screen name="ProfilGuru" component={ProfilGuru} />
        <Stack.Screen name="ProfilSiswa" component={ProfilSiswa} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
