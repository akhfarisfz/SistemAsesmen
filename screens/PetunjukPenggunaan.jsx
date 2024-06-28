import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PetunjukPenggunaan = () => {
  const navigation = useNavigation();

  const startSurvey = () => {
    navigation.navigate('Mode'); // Navigasi ke layar SurveyScreen saat tombol ditekan
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Petunjuk Penggunaan</Text>
      <Text style={styles.text}>Pastikan ruangan tidak terlalu bising</Text>
      <Text style={styles.text}>Dll Dll</Text>
      <Button title="Mulai Survey" onPress={startSurvey} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center', 
  },
});

export default PetunjukPenggunaan;
