import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text, PermissionsAndroid, Alert, TouchableOpacity, ScrollView } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';


export default function SurveyScreen() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const [finalData, setFinalData] = React.useState(null); // State to store finalData

  React.useEffect(() => {
    // Function to load finalData from AsyncStorage
    const loadFinalData = async () => {
      try {
        const data = await AsyncStorage.getItem('FinalData');
        if (data) {
          setFinalData(JSON.parse(data));
        } else {
          Alert.alert('Info', 'Data Asesmen tidak tersedia.');
        }
      } catch (error) {
        console.error('Failed to load data from AsyncStorage:', error);
        Alert.alert('Error', 'Gagal memuat data Asesmen.');
      }
    };

    loadFinalData(); // Load finalData when component mounts
  }, []);

  const printToFile = async () => {
    if (!finalData || !finalData.Asesmen) {
      Alert.alert('Info', 'Tidak ada data Asesmen untuk diekspor.');
      return;
    }

    try {
      // Check storage permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Izin Penyimpanan',
          message: 'Aplikasi membutuhkan akses untuk menyimpan file PDF.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
              <h1>Hasil Asesmen</h1>
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
        console.log('File telah disimpan di:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      } else {
        Alert.alert('Izin Dibutuhkan', 'Izin penyimpanan diperlukan untuk menyimpan file PDF.');
      }
    } catch (error) {
      console.error('Gagal melakukan ekspor ke PDF:', error);
      Alert.alert('Error', 'Gagal melakukan ekspor ke PDF.');
    }
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <ScrollView >
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
            </View>
          )}
          {/* <Text style={styles.infoText}>Jumlah data Asesmen: {asesmenCount}</Text> */}
        </View>
      ) : (
        <Text style={styles.noDataText}>FinalData tidak tersedia</Text>
      )}

      <TouchableOpacity style={styles.downloadButton} onPress={printToFile}>
        <Icon name="file-pdf-box" size={20} color="white" />
        <Text style={styles.downloadButtonText}>Download PDF</Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
