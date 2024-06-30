import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultScreen = ({ route, navigation }) => {
  const { Kategori, scoreHuruf, Jawaban, id } = route.params;

  const [dataGuru, setDataGuru] = useState(null);
  const [FinalData, setFinalData] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomImage, setRandomImage] = useState(null);
  const [mode, setMode] = useState('');

  const images = [
    require('../assets/1.png'),
    require('../assets/2.png'),
    require('../assets/3.png'),
    require('../assets/4.png'),
    require('../assets/5.png')
  ];

  useEffect(() => {
    const fetchModeAndFinalData = async () => {
      try {
        const modeValue = await AsyncStorage.getItem('Mode');
        setMode(modeValue);

        // Jika mode 'Testing', tidak perlu melakukan fetch FinalData
        if (modeValue !== 'Testing') {
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

            finalData.Asesmen = finalData.Asesmen.map((asesmen) => {
              if (asesmen.id === id) {
                return {
                  ...asesmen,
                  Kategori: Kategori,
                };
              }
              return asesmen;
            });

            await AsyncStorage.setItem('FinalData', JSON.stringify(finalData));
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching or storing data from AsyncStorage:', error);
        setLoading(false);
      }
    };

    fetchModeAndFinalData();
  }, [Kategori, id]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat !</Text>
      <Text style={styles.resultText}>Kamu telah menyelesaikan asesmen ini</Text>
  
      {randomImage && <Image source={randomImage} style={styles.logo} />}
      <Text style={styles.resultText}>Kategori Literasimu :</Text>
      <Text style={[styles.resultText, styles.bold]}>{Kategori} </Text>
      <Text style={styles.resultText}>Asesmen telah berakhir</Text>
  
      {!loading && (
        <View style={styles.buttonContainer}>
          {mode !== 'Testing' ? (
            <>
              <Button
                title="Lihat Hasil"
                onPress={() => navigation.navigate('Tampil Hasil')}
                icon={
                  <Icon
                    name="eye"
                    type="font-awesome"
                    size={15}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                buttonStyle={styles.button}
              />
              <Button
                title="Tambah Data Siswa"
                onPress={() => navigation.navigate('Profil Siswa', { dataGuru, FinalData })}
                icon={
                  <Icon
                    name="plus"
                    type="font-awesome"
                    size={15}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                buttonStyle={styles.button}
              />
            </>
          ) : (
            <Button
              title="Kembali ke pilihan Mode"
              onPress={() => navigation.navigate('Mode')}
              icon={
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  size={15}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              }
              buttonStyle={styles.button}
            />
          )}
        </View>
      )}
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
  bold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 220, // Sesuaikan dengan ukuran logo Anda
    height: 220, // Sesuaikan dengan ukuran logo Anda
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0F67B1',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
