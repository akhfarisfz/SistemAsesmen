import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PetunjukPenggunaan = () => {
  const navigation = useNavigation();

  const startSurvey = () => {
    navigation.navigate('Mode'); // Navigasi ke layar SurveyScreen saat tombol ditekan
  };

  const instructions = [
    "Pastikan ruangan tidak terlalu bising.",
    "Siapkan alat tulis jika diperlukan.",
    "Bacalah setiap pertanyaan dengan seksama.",
    "Jawab dengan jujur sesuai dengan keadaan sebenarnya.",
    "Jangan tergesa-gesa dalam menjawab setiap pertanyaan.",
    "Pastikan koneksi internet stabil jika menggunakan perangkat online.",
    "Jaga privasi dan kerahasiaan data Anda selama mengisi survey.",
    "Jika ada pertanyaan yang tidak dimengerti, jangan ragu untuk bertanya kepada pengawas.",
    "Setelah selesai, pastikan semua pertanyaan telah terjawab dengan benar.",
    "Tekan tombol 'Submit' untuk mengirimkan jawaban Anda."
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Petunjuk Penggunaan</Text>
      {instructions.map((instruction, index) => (
        <View style={styles.listItem} key={index}>
          <Text style={styles.number}>{index + 1}.</Text>
          <Text style={styles.itemText}>{instruction}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={startSurvey}>
          <Text style={styles.buttonText}>Mulai Survey</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', 
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  button: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#0F67B1',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default PetunjukPenggunaan;
