import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilGuru = ({ navigation }) => {
  const [nama, setNama] = useState('');
  const [satuanPendidikan, setSatuanPendidikan] = useState('');
  const [bentukSatuanPendidikan, setBentukSatuanPendidikan] = useState('MI');
  const [kecamatan, setKecamatan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [provinsi, setProvinsi] = useState('');

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('dataGuru');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setNama(parsedData.nama || '');
          setSatuanPendidikan(parsedData.satuanPendidikan || '');
          setBentukSatuanPendidikan(parsedData.bentukSatuanPendidikan || 'MI');
          setKecamatan(parsedData.kecamatan || '');
          setKabupaten(parsedData.kabupaten || '');
          setProvinsi(parsedData.provinsi || '');
        }
      } catch (error) {
        console.error('Gagal mengambil data dari local storage:', error);
      }
    };

    fetchStoredData();
  }, []);

  const handleSubmit = async () => {
    // Simpan data ke local storage
    try {
      const data = {
        nama,
        satuanPendidikan,
        bentukSatuanPendidikan,
        kecamatan,
        kabupaten,
        provinsi,
      };
      await AsyncStorage.setItem('dataGuru', JSON.stringify(data));
      console.log('Data guru berhasil disimpan:', data);
      navigation.navigate('Profil Siswa'); // Navigasi ke layar ProfilSiswa saat tombol ditekan
    } catch (error) {
      console.error('Gagal menyimpan data guru:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Guru</Text>
      <TextInput
        label="Nama"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Satuan Pendidikan"
        value={satuanPendidikan}
        onChangeText={setSatuanPendidikan}
        style={styles.input}
        mode="outlined"
      />
      <Text style={styles.label}>Bentuk Satuan Pendidikan</Text>
      <RadioButton.Group
        onValueChange={(value) => setBentukSatuanPendidikan(value)}
        value={bentukSatuanPendidikan}
      >
        <View style={styles.radioContainer}>
          <RadioButton.Item label="MI" value="MI" />
          <RadioButton.Item label="SD" value="SD" />
        </View>
      </RadioButton.Group>
      <TextInput
        label="Kecamatan"
        value={kecamatan}
        onChangeText={setKecamatan}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Kabupaten"
        value={kabupaten}
        onChangeText={setKabupaten}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Provinsi"
        value={provinsi}
        onChangeText={setProvinsi}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Simpan
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default ProfilGuru;
