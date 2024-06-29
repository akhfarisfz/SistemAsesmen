import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mode = ({ navigation }) => {
  const [currentMode, setCurrentMode] = useState('');

  useEffect(() => {
    const fetchMode = async () => {
      const mode = await AsyncStorage.getItem('mode');
      setCurrentMode(mode);
    };

    fetchMode();
  }, []);

  const handleInstrumenAsesmen = async () => {
    await AsyncStorage.setItem('mode', 'Testing');
    setCurrentMode('Testing');
    navigation.navigate('Profil Guru');
  };

  const handleAsesmenRiil = async () => {
    await AsyncStorage.setItem('mode', 'Riil');
    setCurrentMode('Riil');
    navigation.navigate('Profil Guru');
  };

  return (
    <View style={styles.container}>
      <Text>Saat ini anda ingin menggunakan aplikasi ini secara apa?</Text>
      <Button
        mode="contained"
        onPress={handleInstrumenAsesmen}
        style={[styles.button, { backgroundColor: '#007BFF' }]}
        labelStyle={{ color: 'white', fontSize: 18 }}
      >
        Saya ingin mencoba
      </Button>
      <Button
        mode="contained"
        onPress={handleAsesmenRiil}
        style={[styles.button, { backgroundColor: '#DC3545' }]}
        labelStyle={{ color: 'white', fontSize: 18 }}
      >
        Saya melakukan asesmen sebenarnya
      </Button>
      {/* <Text style={styles.currentMode}>Mode saat ini: {currentMode}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
    paddingVertical:20,
    marginVertical:10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  currentMode: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Mode;
