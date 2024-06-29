import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';

const ProfilSiswa = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [kelas, setKelas] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(1);
    }, [])
  );
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = () => {
    // Contoh logika untuk mengirim data atau menyimpan data
    console.log({
      nama,
      jenisKelamin,
      kelas,
    });
    navigation.navigate('Tes Membaca');
  };

  return (
    <View style={styles.container}>
      {currentPage === 1 && (
        <View>
          <Text style={styles.title}>Masukkan Nama</Text>
          <TextInput
            label="Nama"
            value={nama}
            onChangeText={setNama}
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={nextPage} style={styles.button}>
            Next
          </Button>
        </View>
      )}

      {currentPage === 2 && (
        <View>
          <Text style={styles.title}>Pilih Jenis Kelamin</Text>
          <RadioButton.Group
            onValueChange={(value) => setJenisKelamin(value)}
            value={jenisKelamin}
          >
            <View style={styles.radioContainer}>
              <RadioButton.Item label="Laki-laki" value="Laki-laki" />
              <RadioButton.Item label="Perempuan" value="Perempuan" />
            </View>
          </RadioButton.Group>
          <View style={styles.navigationButtons}>
            <Button mode="contained" onPress={previousPage} style={styles.button}>
              Previous
            </Button>
            <Button mode="contained" onPress={nextPage} style={styles.button}>
              Next
            </Button>
          </View>
        </View>
      )}

      {currentPage === 3 && (
        <View>
          <Text style={styles.title}> Kelas</Text>
          <RadioButton.Group
            onValueChange={(value) => setKelas(value)}
            value={kelas}
          >
            <View style={styles.radioContainer}>
              <RadioButton.Item label="Kelas 1" value="Kelas 1" />
              <RadioButton.Item label="Kelas 2" value="Kelas 2" />
              <RadioButton.Item label="Kelas 3" value="Kelas 3" />
              <RadioButton.Item label="Kelas 4" value="Kelas 4" />
              <RadioButton.Item label="Kelas 5" value="Kelas 5" />
              <RadioButton.Item label="Kelas 6" value="Kelas 6" />
            </View>
          </RadioButton.Group>
          <View style={styles.navigationButtons}>
            <Button mode="contained" onPress={previousPage} style={styles.button}>
              Previous
            </Button>
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Submit
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
  radioContainer: {
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '45%',
  },
});

export default ProfilSiswa;
