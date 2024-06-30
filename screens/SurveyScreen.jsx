import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SurveyScreen = () => {
  const [finalData, setFinalData] = useState(null);
  const [asesmenCount, setAsesmenCount] = useState(0);

  useEffect(() => {
    const fetchFinalData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('FinalData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        setFinalData(data);
        if (data && data.Asesmen) {
          setAsesmenCount(data.Asesmen.length);
        } else {
          setAsesmenCount(0);
        }
      } catch (error) {
        console.error('Error fetching FinalData from AsyncStorage:', error);
      }
    };

    fetchFinalData();
  }, []);

  const handleDeleteFinalData = async () => {
    try {
      await AsyncStorage.removeItem('FinalData');
      setFinalData(null); // Menghapus data dari state setelah dihapus dari AsyncStorage
      setAsesmenCount(0); // Reset jumlah asesmen setelah penghapusan data
      Alert.alert('Sukses', 'Data FinalData berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting FinalData:', error);
      Alert.alert('Error', 'Gagal menghapus data FinalData.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Data Asesmen </Text>
      {finalData ? (
        <View style={styles.dataContainer}>
          {finalData && (
            <View>
              <Text style={styles.tableTitle}>Data Guru</Text>
              <View style={[styles.tableHeader, styles.horizontalRow]}>
                <Text style={[styles.headerText, styles.horizontalItem]}>Nama Siswa</Text>
                <Text style={[styles.headerText, styles.horizontalItem]}>{finalData.Guru.nama}</Text>
              </View>
              <View style={[styles.tableHeader, styles.horizontalRow]}>
                <Text style={[styles.headerText, styles.horizontalItem]}>Satuan Pendidikan</Text>
                <Text style={[styles.headerText, styles.horizontalItem]}>{finalData.Guru.satuanPendidikan}</Text>
              </View>
            </View>
          )}

          {finalData.Asesmen && (
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Data Siswa</Text>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Nama Siswa</Text>
                <Text style={styles.headerText}>Jenis Kelamin</Text>
                <Text style={styles.headerText}>Kelas</Text>
                <Text style={styles.headerText}>Kategori</Text>
              </View>
              {finalData.Asesmen.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.rowText}>{item.Nama_siswa}</Text>
                  <Text style={styles.rowText}>{item.JenisKelamin}</Text>
                  <Text style={styles.rowText}>{item.Kelas}</Text>
                  <Text style={styles.rowText}>{item.Kategori}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.deleteLocalButton} onPress={handleDeleteFinalData}>
                <Text style={styles.deleteButtonText}>Hapus Data Local</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.infoText}>Jumlah data Asesmen: {asesmenCount}</Text>
        </View>
      ) : (
        <Text style={styles.noDataText}>FinalData tidak tersedia</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  deleteLocalButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  keyText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valueText: {
    fontSize: 14,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  horizontalItem: {
    flex: 1,
    textAlign: 'left',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 5,
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SurveyScreen;
