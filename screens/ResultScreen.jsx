import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { Kategori, scoreKata, scoreHuruf, Jawaban } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Terimakasih</Text>
      <Text style={styles.resultText}>Kategori: {Kategori}</Text>
      <Text style={styles.resultText}>Skor Kata: {scoreKata}</Text>
      <Text style={styles.resultText}>Skor Huruf: {scoreHuruf}</Text>
      <Text style={styles.resultText}>Jawaban: {Jawaban}</Text>
      <Text style={styles.resultText}>Asesmen telah berakhir</Text>
      <Button title="Back to Survey" onPress={() => navigation.navigate('Survey')} />
      <Button title="Terimakasih" onPress={() => console.log('Terimakasih button pressed')} />
      <Text style={styles.resultText}>Apakah ingin tambah data lagi?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Ya" onPress={() => navigation.navigate('Profil Siswa',{currentPage:1})} />
        <Button title="Tidak" onPress={() => console.log('Tidak button pressed')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});
