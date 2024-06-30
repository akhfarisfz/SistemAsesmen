import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilSiswa = ({ route, navigation }) => {
  const { dataGuru } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [kelas, setKelas] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(1);
      setNama('');
      setJenisKelamin('');
      setKelas('');
      setIsSubmitting(false);
      setErrors({});
    }, [])
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const validatePage = () => {
    const newErrors = {};
    if (currentPage === 1 && !nama) newErrors.nama = 'Nama wajib diisi';
    if (currentPage === 2 && !jenisKelamin) newErrors.jenisKelamin = 'Jenis Kelamin wajib dipilih';
    if (currentPage === 3 && !kelas) newErrors.kelas = 'Kelas wajib dipilih';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextPage = () => {
    if (validatePage()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!validatePage()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let finalData = await AsyncStorage.getItem('FinalData');
      if (!finalData) {
        finalData = {
          Guru: dataGuru,
          Asesmen: [],
        };
      } else {
        finalData = JSON.parse(finalData);
      }

      const asesmenBaru = {
        id: finalData.Asesmen.length + 1, // Menggunakan panjang array untuk id baru
        Nama_siswa: nama,
        JenisKelamin: jenisKelamin,
        Kelas: kelas,
        Kategori: null, 
        MembacaTeks: { jawaban: {} },
        MembacaHuruf: { jawaban: {} },
        MembacaParagraf: { jawaban: {} },
      };

      let id = asesmenBaru.id;

      finalData.Asesmen.push(asesmenBaru);

      await AsyncStorage.setItem('FinalData', JSON.stringify(finalData));
      console.log(finalData.Asesmen)

      console.log(id)
      navigation.navigate('Tes Membaca', { FinalData: finalData, id: id });
      
    } catch (error) {
      console.error('Failed to save data:', error);
      // Handle error if saving fails
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {currentPage === 1 && (
        <View style={styles.inputArea}>
          <Text style={styles.title}>Masukkan Nama</Text>
          <TextInput
            label="Nama"
            value={nama}
            onChangeText={setNama}
            style={styles.input}
            mode="outlined"
            error={!!errors.nama}
          />
          {errors.nama && <Text style={styles.errorText}>{errors.nama}</Text>}
          <View style={styles.navigationButtons}>
            <Button mode="contained" onPress={handleBack} style={styles.button}>
              Previous
            </Button>
            <Button mode="contained" onPress={nextPage} style={styles.button}>
              Next
            </Button>
          </View>
        </View>
      )}

      {currentPage === 2 && (
        <View style={styles.inputArea}>
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
          {errors.jenisKelamin && <Text style={styles.errorText}>{errors.jenisKelamin}</Text>}
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
        <View style={styles.inputArea}>
          <Text style={styles.title}>Pilih Kelas</Text>
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
          {errors.kelas && <Text style={styles.errorText}>{errors.kelas}</Text>}
          <View style={styles.navigationButtons}>
            <Button mode="contained" onPress={previousPage} style={styles.button}>
              Previous
            </Button>
            <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
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
    padding: 10,
    justifyContent: 'center',
  },
  inputArea: {
    backgroundColor: '#D3D3D3',
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F67B1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 50,
    width: 100,
  },
  backButtonPressed: {
    backgroundColor: '#FFFFFF',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  radioContainer: {
    marginBottom: 20,
    borderColor: '#CCCCCC',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 5,
    backgroundColor: '#0F67B1',
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default ProfilSiswa;
