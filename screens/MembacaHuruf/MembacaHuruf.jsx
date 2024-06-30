import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../../data'; // Pastikan path sesuai dengan struktur proyek Anda

const MembacaHuruf = ({ route,navigation }) => {
  const{id}=route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLetters, setSelectedLetters] = useState({});
  const [score, setScore] = useState(20);
  const handleSubmit = async () => {
    const newKategori = 'Intervensi Khusus Tingkat Huruf'; 
    navigation.navigate('Hasil Asesmen', { Kategori: newKategori, scoreHuruf: score ,id:id});
  };

  const simpanHasilTesKeDataJs = (kategori, selectedLetters, score) => {
    // Memasukkan hasil tes huruf ke data.js
    const indexSiswa = data.Asesmen.length - 1; // Ambil index siswa terakhir
    data.Asesmen[indexSiswa].MembacaHuruf = {
      jawaban: selectedLetters,
      score: score,
      kategori: kategori,
    };
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
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
          <Text style={styles.item}>{`\u2022 `}Di halaman berikut, akan tampil huruf-huruf yang harus dibaca siswa.</Text>
          <Text style={styles.item}>{`\u2022 `}Mintalah siswa membaca semua huruf satu persatu, dari kiri ke kanan. Mulai dari baris pertama berlanjut ke baris berikutnya dan seterusnya.</Text>
          <Text style={styles.item}>{`\u2022 `}<Text style={styles.bold}>Tekan huruf </Text> Jika siswa tidak bisa menyebutkan huruf dan <Text style={styles.bold}>biarkan</Text> apabila siswa dapat menyebutkan huruf.</Text>
          <Text style={styles.item}>{`\u2022 `}Jika siswa tidak selesai membaca suatu huruf lebih dari 3 detik, maka dianggap salah. Mintalah siswa melanjutkan ke huruf berikutnya.</Text>
          <Button mode='outlined' onPress={nextPage}>Next</Button>
        </View>
      )}

      {currentPage === 2 && (
        <View>
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
          <Button mode='outlined' onPress={previousPage}>Previous</Button>
          <Button mode='outlined' onPress={handleSubmit}>Submit</Button>
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
  }
});
