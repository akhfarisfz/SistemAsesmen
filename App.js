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
import TesMembaca from './screens/KelancaranMembaca/TesMembaca.jsx';
import MembacaHuruf from './screens/MembacaHuruf/MembacaHuruf.jsx';
import SoalCerita from './screens/SoalCerita/SoalCerita.jsx';
import MembacaParagraf from './screens/MembacaParagraf/MembacaParagraf.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Petunjuk Penggunaan" component={PetunjukPenggunaan} />
        <Stack.Screen name="Mode" component={Mode} />
        <Stack.Screen name="Profil Guru" component={ProfilGuru} options={{headerShown:false}} />
        <Stack.Screen name="Profil Siswa" component={ProfilSiswa}/>
        <Stack.Screen name="Tes Membaca" component={TesMembaca} options={{headerShown:false}} />
        <Stack.Screen name="Membaca Huruf" component={MembacaHuruf} />
        <Stack.Screen name="Soal Cerita" component={SoalCerita} />
        <Stack.Screen name="Membaca Paragraf" component={MembacaParagraf} />
        <Stack.Screen name="Hasil Asesmen" component={ResultScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Tampil Hasil" component={SurveyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
