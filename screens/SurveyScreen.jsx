import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';


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
      setFinalData(null);
      setAsesmenCount(0);
      Alert.alert('Sukses', 'Data FinalData berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting FinalData:', error);
      Alert.alert('Error', 'Gagal menghapus data FinalData.');
    }
  };
  const exportToPDF = async () => {
    if (!finalData || !finalData.Asesmen) {
      Alert.alert('Info', 'Tidak ada data Asesmen untuk diekspor.');
      return;
    }
  
    try {
      let htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Data Asesmen</h1>
            <h2>Data Guru</h2>
            <table>
              <tr><th>Nama Guru</th><td>${finalData.Guru.Nama_Guru}</td></tr>
              <tr><th>Satuan Pendidikan</th><td>${finalData.Guru.Satuan_pendidikan}</td></tr>
            </table>
            <h2>Data Siswa</h2>
            <table>
              <tr><th>Nama Siswa</th><th>Jenis Kelamin</th><th>Kelas</th><th>Kategori</th></tr>
      `;
  
      finalData.Asesmen.forEach(item => {
        htmlContent += `
          <tr>
            <td>${item.Nama_siswa}</td>
            <td>${item.JenisKelamin}</td>
            <td>${item.Kelas}</td>
            <td>${item.Kategori}</td>
          </tr>
        `;
      });
  
      htmlContent += `
            </table>
          </body>
        </html>
      `;
  
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
  
      // Menyimpan ke galeri setelah diekspor
      await saveFileToGallery(uri, 'pdf', 'PDF');
  
      Alert.alert('Sukses', `PDF berhasil diekspor. File tersimpan di: ${uri}`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      Alert.alert('Error', 'Gagal mengekspor ke PDF.');
    }
  };
  
  const exportToExcel = async () => {
    if (!finalData || !finalData.Asesmen) {
      Alert.alert('Info', 'Tidak ada data Asesmen untuk diekspor.');
      return;
    }
  
    const header = ['Nama Siswa', 'Jenis Kelamin', 'Kelas', 'Kategori'];
    const data = finalData.Asesmen.map(item => [
      item.Nama_siswa,
      item.JenisKelamin,
      item.Kelas,
      item.Kategori,
    ]);
  
    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asesmen');
  
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const fileName = 'Asesmen.xlsx';
    const uri = FileSystem.documentDirectory + fileName;
  
    try {
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Pindahkan file ke direktori 'Download' menggunakan downloadAsync
      const downloadDest = `${FileSystem.documentDirectory}Download/${fileName}`;
      await FileSystem.downloadAsync(uri, downloadDest);
  
      // Menyimpan ke galeri setelah diekspor
      await saveFileToGallery(downloadDest, 'xlsx', 'Excel');
  
      Alert.alert('Sukses', 'Data berhasil diekspor dan disimpan di galeri.');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      Alert.alert('Error', 'Gagal mengekspor ke Excel dan menyimpan di galeri.');
    }
  };
  
  const saveFileToGallery = async (fileUri, fileType, fileTypeDisplay) => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('Download', asset, false);
        Alert.alert('Sukses', `${fileTypeDisplay} berhasil disimpan di galeri.`);
      } else {
        Alert.alert('Info', `Izin akses galeri diperlukan untuk menyimpan file ${fileType}.`);
      }
    } catch (error) {
      console.error(`Error saving ${fileType} to gallery:`, error);
      Alert.alert('Error', `Gagal menyimpan file ${fileTypeDisplay} di galeri.`);
    }
  };
  
  // const exportToExcel = async () => {
  //   if (!finalData || !finalData.Asesmen) {
  //     Alert.alert('Info', 'Tidak ada data Asesmen untuk diekspor.');
  //     return;
  //   }
  
  //   const header = ['Nama Siswa', 'Jenis Kelamin', 'Kelas', 'Kategori'];
  //   const data = finalData.Asesmen.map(item => [
  //     item.Nama_siswa,
  //     item.JenisKelamin,
  //     item.Kelas,
  //     item.Kategori,
  //   ]);
  
  //   const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Asesmen');
  
  //   const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  //   const fileName = 'Asesmen.xlsx';
  //   const uri = FileSystem.documentDirectory + fileName;
  
  //   try {
  //     await FileSystem.writeAsStringAsync(uri, wbout, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  
  //     // Pindahkan file ke direktori 'Download' menggunakan downloadAsync
  //     const downloadDest = `${FileSystem.documentDirectory}Download/${fileName}`;
  //     await FileSystem.downloadAsync(uri, downloadDest);
  
  //     // Bagikan atau simpan ke galeri
  //     const permission = await MediaLibrary.requestPermissionsAsync();
  //     if (permission.granted) {
  //       const asset = await MediaLibrary.createAssetAsync(downloadDest);
  //       await MediaLibrary.createAlbumAsync('Download', asset, false);
  //     } else {
  //       Alert.alert('Info', 'Izin akses galeri diperlukan untuk menyimpan file.');
  //     }
  
  //     Alert.alert('Sukses', 'Data berhasil diekspor dan disimpan di galeri.');
  //   } catch (error) {
  //     console.error('Error exporting to Excel:', error);
  //     Alert.alert('Error', 'Gagal mengekspor ke Excel dan menyimpan di galeri.');
  //   }
  // };
  



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Data Asesmen</Text>

      {finalData ? (
        <View style={styles.dataContainer}>
          {finalData && (
            <View>
              <Text style={styles.tableTitle}>Data Guru</Text>
              <View style={styles.horizontalRow}>
                <Text style={styles.horizontalItem}>Nama Guru:</Text>
                <Text style={styles.horizontalItem}>{finalData.Guru.Nama_Guru}</Text>
              </View>
              <View style={styles.horizontalRow}>
                <Text style={styles.horizontalItem}>Satuan Pendidikan:</Text>
                <Text style={styles.horizontalItem}>{finalData.Guru.Satuan_pendidikan}</Text>
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

      <View style={styles.downloadButtonsContainer}>
        <TouchableOpacity style={styles.downloadButton} onPress={exportToExcel}>
          <Icon name="file-excel-box" size={20} color="white" />
          <Text style={styles.downloadButtonText}>Download Excel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton} onPress={exportToPDF}>
          <Icon name="file-pdf-box" size={20} color="white" />
          <Text style={styles.downloadButtonText}>Download PDF</Text>
        </TouchableOpacity>

      </View>
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
  downloadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SurveyScreen;
