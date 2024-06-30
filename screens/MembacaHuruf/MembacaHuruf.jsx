import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const MembacaHuruf = ({ route, navigation }) => {
  const { id } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLetters, setSelectedLetters] = useState({});
  const [score, setScore] = useState(20);
  const [isBackPressed, setIsBackPressed] = useState(false);

  const handleSubmit = async () => {
    const newKategori = 'Intervensi Khusus Tingkat Huruf';
    navigation.navigate('Hasil Asesmen', { Kategori: newKategori, scoreHuruf: score, id: id });
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      navigation.goBack();
    }
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  // Data huruf untuk tes membaca huruf
  const dataSoalHuruf = [
    { id: '1', label: 'A', value: 1 },
    { id: '2', label: 'm', value: 1 },
    { id: '3', label: 'B', value: 1 },
    { id: '4', label: 'z', value: 1 },
    { id: '5', label: 'E', value: 1 },
    { id: '6', label: 'r', value: 1 },
    { id: '7', label: 'Q', value: 1 },
    { id: '8', label: 'h', value: 1 },
    { id: '9', label: 'I', value: 1 },
    { id: '10', label: 'k', value: 1 },
    { id: '11', label: 'L', value: 1 },
    { id: '12', label: 'n', value: 1 },
    { id: '13', label: 'O', value: 1 },
    { id: '14', label: 'p', value: 1 },
    { id: '15', label: 'S', value: 1 },
    { id: '16', label: 'g', value: 1 },
    { id: '17', label: 'U', value: 1 },
    { id: '18', label: 'v', value: 1 },
    { id: '19', label: 'X', value: 1 },
    { id: '20', label: 'c', value: 1 },
  ];

  const toggleSelectLetter = (id, value) => {
    setSelectedLetters((prev) => {
      const newState = { ...prev };
      if (newState[id]) {
        delete newState[id];
        setScore(score + value); // Increment score when deselected
      } else {
        newState[id] = true;
        setScore(score - value); // Decrement score when selected
      }
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      {currentPage === 1 && (
        <View>
          <Text style={styles.title}>Petunjuk Membaca Huruf</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.item}>Di halaman berikut, akan tampil huruf-huruf yang harus dibaca siswa.</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.item}>Mintalah siswa membaca semua huruf satu persatu, dari kiri ke kanan. Mulai dari baris pertama berlanjut ke baris berikutnya dan seterusnya.</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.item}><Text style={styles.bold}>Tekan huruf </Text> Jika siswa tidak bisa menyebutkan huruf dan <Text style={styles.bold}>biarkan</Text> apabila siswa dapat menyebutkan huruf.</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.item}>Jika siswa tidak selesai membaca suatu huruf lebih dari 3 detik, maka dianggap salah. Mintalah siswa melanjutkan ke huruf berikutnya.</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={nextPage}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentPage === 2 && (
        <View>
          <TouchableOpacity
            style={[styles.backButton, isBackPressed && styles.backButtonPressed]}
            onPressIn={() => setIsBackPressed(true)}
            onPressOut={() => setIsBackPressed(false)}
            onPress={handleBack}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Membaca Huruf</Text>
          <View style={styles.lettersContainer}>
            {dataSoalHuruf.map((letter) => (
              <Text
                key={letter.id}
                style={[
                  styles.questionarea,
                  selectedLetters[letter.id] && styles.selected,
                ]}
                onPress={() => toggleSelectLetter(letter.id, letter.value)}
              >
                {letter.label}
              </Text>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MembacaHuruf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 12
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    marginRight: 5,
  },
  bold: {
    fontWeight: 'bold'
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ededed',
    marginVertical: 30
  },
  questionarea: {
    backgroundColor: '#ededed',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    textAlign: 'center',
  },
  selected: {
    borderWidth: 2,
    borderColor: 'red'
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F67B1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 50,
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
});
