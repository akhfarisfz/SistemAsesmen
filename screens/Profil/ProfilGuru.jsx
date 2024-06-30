import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Mengimpor ikon dari react-native-vector-icons

const ProfilGuru = ({ route, navigation }) => {
  const [nama, setNama] = useState('');
  const [satuanPendidikan, setSatuanPendidikan] = useState('');
  const [bentukSatuanPendidikan, setBentukSatuanPendidikan] = useState('MI');
  const [kecamatan, setKecamatan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [provinsi, setProvinsi] = useState('');

  const [errors, setErrors] = useState({});

  const [isBackPressed, setIsBackPressed] = useState(false);

  const validateInputs = () => {
    const newErrors = {};
    if (!nama) newErrors.nama = 'Nama wajib diisi';
    if (!satuanPendidikan) newErrors.satuanPendidikan = 'Satuan Pendidikan wajib diisi';
    if (!kecamatan) newErrors.kecamatan = 'Kecamatan wajib diisi';
    if (!kabupaten) newErrors.kabupaten = 'Kabupaten wajib diisi';
    if (!provinsi) newErrors.provinsi = 'Provinsi wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      const dataGuru = {
        nama,
        satuanPendidikan,
        bentukSatuanPendidikan,
        kecamatan,
        kabupaten,
        provinsi,
      };

      navigation.navigate('Profil Siswa', { dataGuru: dataGuru });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.backButton, isBackPressed && styles.backButtonPressed]}
          onPressIn={() => setIsBackPressed(true)}
          onPressOut={() => {
            setIsBackPressed(false);
            handleBack();
          }}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profil Guru</Text>
        <TextInput
          label="Nama"
          value={nama}
          onChangeText={setNama}
          style={styles.input}
          mode="outlined"
          error={!!errors.nama}
        />
        {errors.nama && <Text style={styles.errorText}>{errors.nama}</Text>}
        <TextInput
          label="Satuan Pendidikan"
          value={satuanPendidikan}
          onChangeText={setSatuanPendidikan}
          style={styles.input}
          mode="outlined"
          error={!!errors.satuanPendidikan}
        />
        {errors.satuanPendidikan && <Text style={styles.errorText}>{errors.satuanPendidikan}</Text>}
        <Text style={styles.label}>Bentuk Satuan Pendidikan</Text>
        <RadioButton.Group
          onValueChange={(value) => setBentukSatuanPendidikan(value)}
          value={bentukSatuanPendidikan}
        >
          <View style={styles.radioContainer}>
            <RadioButton.Item label="MI" value="MI" color="#007BFF" uncheckedColor="#CCCCCC" />
            <RadioButton.Item label="SD" value="SD" color="#007BFF" uncheckedColor="#CCCCCC" />
          </View>
        </RadioButton.Group>
        <TextInput
          label="Kecamatan"
          value={kecamatan}
          onChangeText={setKecamatan}
          style={styles.input}
          mode="outlined"
          error={!!errors.kecamatan}
        />
        {errors.kecamatan && <Text style={styles.errorText}>{errors.kecamatan}</Text>}
        <TextInput
          label="Kabupaten"
          value={kabupaten}
          onChangeText={setKabupaten}
          style={styles.input}
          mode="outlined"
          error={!!errors.kabupaten}
        />
        {errors.kabupaten && <Text style={styles.errorText}>{errors.kabupaten}</Text>}
        <TextInput
          label="Provinsi"
          value={provinsi}
          onChangeText={setProvinsi}
          style={styles.input}
          mode="outlined"
          error={!!errors.provinsi}
        />
        {errors.provinsi && <Text style={styles.errorText}>{errors.provinsi}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    padding: 10,
    backgroundColor: '#0F67B1',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default ProfilGuru;
