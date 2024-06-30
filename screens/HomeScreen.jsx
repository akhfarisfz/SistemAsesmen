import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const nextSlide = () => {
    navigation.navigate('Petunjuk Penggunaan'); // Navigasi ke layar SurveyScreen saat tombol ditekan
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Selamat Datang di Aplikasi Sistem Asesmen Literasi (ASI-ASLI)!</Text>
        <Image
          source={require('../assets/image.png')} // Ganti dengan path yang sesuai ke file logo Anda
          style={styles.logo}
        />
        <Text style={styles.paragraph}>
          Aplikasi ini dirancang untuk membantu guru dalam mengevaluasi dan meningkatkan kemampuan membaca siswa. Terdapat empat tingkatan kompetensi membaca yang diidentifikasi dalam asesmen ini:
        </Text>
        <View style={styles.listItem}>
          <Text style={styles.number}>1.</Text>
          <Text style={styles.itemText}><Text style={styles.bold}>Tingkat Mahir</Text>. Pada tingkat ini, siswa mampu mengevaluasi, merefleksi, dan menghubungkan bacaan dengan kehidupan sehari-hari.</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.number}>2.</Text>
          <Text style={styles.itemText}><Text style={styles.bold}>Tingkat Cakap</Text>. Pada tingkat ini, siswa dapat menemukan informasi tersirat, membandingkan, dan menyimpulkan isi bacaan.</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.number}>3.</Text>
          <Text style={styles.itemText}><Text style={styles.bold}>Tingkat Dasar</Text>. Pada tingkat ini, siswa mampu menemukan informasi yang tersurat dalam bacaan.</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.number}>4.</Text>
          <Text style={styles.itemText}><Text style={styles.bold}>Tingkat Intervensi Khusus</Text>. Pada tingkat ini, siswa memerlukan bantuan khusus untuk memahami bacaan. Tingkat ini dibagi menjadi 5 level Pemula, Huruf, Kata, Paragraf,dan Cerita.</Text>
        </View>
        {/* <Text style={styles.paragraph}>Setelah asesmen, aplikasi ini akan memberikan rekomendasi pembelajaran yang sesuai berdasarkan tingkat kompetensi membaca siswa, untuk membantu mereka meningkatkan kemampuan membacanya.</Text> */}
        <TouchableOpacity style={styles.button} onPress={nextSlide}>
          <Text style={styles.buttonText}>Lanjut</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'justify',
    // fontFamily:
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
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
  logo: {
    width: 220, // Sesuaikan dengan ukuran logo Anda
    height: 220, // Sesuaikan dengan ukuran logo Anda
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
