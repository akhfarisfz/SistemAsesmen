import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultScreen = ({ route, navigation }) => {
  const { Kategori, scoreHuruf, Jawaban, id } = route.params;

  const [dataGuru, setDataGuru] = useState(null);
  const [FinalData, setFinalData] = useState('');
  const [loading, setLoading] = useState(true); // State untuk menampilkan loading
  let id_now=id-1;
  console.log(id)
  useEffect(() => {
    const fetchAndStoreFinalData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('FinalData');
        let finalData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setFinalData(finalData);
        if (finalData) {
          if (finalData.Guru) {
            const { nama, satuanPendidikan, bentukSatuanPndidikan, kecamatan, kabupaten, provinsi } = finalData.Guru;
            setDataGuru({
              nama,
              satuanPendidikan,
              bentukSatuanPndidikan,
              kecamatan,
              kabupaten,
              provinsi,
            });
          }

          // Update the specific assessment with Kategori based on id
          finalData.Asesmen = finalData.Asesmen.map((asesmen) => {
            if (asesmen.id === id) {
              return {
                ...asesmen,
                Kategori: Kategori,
              };
            }
            return asesmen;
          });

          // Store updated finalData back to AsyncStorage
          await AsyncStorage.setItem('FinalData', JSON.stringify(finalData));

          // Set FinalData state and indicate that loading has finished
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching or storing FinalData from AsyncStorage:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchAndStoreFinalData();
  }, [Kategori, id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render UI when FinalData is available
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Terimakasih</Text>
      
      <Text style={styles.resultText}>Kategori: {Kategori}</Text>
      <Text style={styles.resultText}>Skor Huruf: {scoreHuruf}</Text>
      <Text style={styles.resultText}>Jawaban: {Jawaban}</Text>
      <Text style={styles.resultText}>Asesmen telah berakhir</Text>
      
      <Button title="Lihat Hasil" onPress={() => navigation.navigate('Tampil Hasil')} />
      <Button title="Tambah Data" onPress={() => navigation.navigate('Profil Siswa', { dataGuru, FinalData })} />
    </View>
  );
};

export default ResultScreen;

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
});
