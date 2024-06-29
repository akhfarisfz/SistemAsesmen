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
      <Text style={styles.title}>Petunjuk Penggunaan</Text>
      <Text style={styles.text}>1. Pastikan ruangan tidak terlalu bising.</Text>
      <Text style={styles.text}>2. Siapkan alat tulis jika diperlukan.</Text>
      <Text style={styles.text}>3. Bacalah setiap pertanyaan dengan seksama.</Text>
      <Text style={styles.text}>4. Jawab dengan jujur sesuai dengan keadaan sebenarnya.</Text>
      <Text style={styles.text}>5. Jangan tergesa-gesa dalam menjawab setiap pertanyaan.</Text>
      <Text style={styles.text}>6. Pastikan koneksi internet stabil jika menggunakan perangkat online.</Text>
      <Text style={styles.text}>7. Jaga privasi dan kerahasiaan data Anda selama mengisi survey.</Text>
      <Text style={styles.text}>8. Jika ada pertanyaan yang tidak dimengerti, jangan ragu untuk bertanya kepada pengawas.</Text>
      <Text style={styles.text}>9. Setelah selesai, pastikan semua pertanyaan telah terjawab dengan benar.</Text>
      <Text style={styles.text}>10. Tekan tombol "Submit" untuk mengirimkan jawaban Anda.</Text>
      <Button title="Mulai Survey" onPress={startSurvey} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    // alignItems: 'center', 
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', 
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PetunjukPenggunaan;
