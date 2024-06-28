import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const nextSlide = () => {
    navigation.navigate('PetunjukPenggunaan'); // Navigasi ke layar SurveyScreen saat tombol ditekan
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di Aplikasi Aplikasi Sistem Asesmen Literasi (ASI-ASLI)!</Text>
      <Image
        source={require('../assets/image.png')} // Ganti dengan path yang sesuai ke file logo Anda
        style={styles.logo}
      />
      <Text style={styles.paragraph}>
        Asesmen ini merupakan Aplikasi yang membantu bapak dan ibu guru dalam mengetahui tingkat kompetensi membaca.
        Adapun ada 4 tingkatan kompetensi membaca antara lain:
      </Text>
      <Text style={styles.item}>1. <Text style={styles.bold}>Tingkat Mahir</Text>. Pada tingkat ini, siswa telah mampu mengevaluasi dan merefleksi bacaan dan menghubungkannya dengan kehidupan sehari-hari. </Text>
      <Text style={styles.item}>2. <Text style={styles.bold}>Tingkat Cakap</Text>. Pada tingkat ini, siswa mampu menemukan informasi tersirat, membandingkan dan menyimpulkan bacaan.</Text>
      <Text style={styles.item}>3. <Text style={styles.bold}>Tingkat Dasar</Text>. Pada tingkat ini, siswa mampu menemukan informasi yang tersurat dalam bacaan.</Text>
      <Text style={styles.item}>4. <Text style={styles.bold}>Tingkat Intervensi Khusus</Text>. Pada tingkat ini, siswa mampu menemukan informasi yang tersurat dalam bacaan.</Text>
      <Text style={styles.paragraph}>Di akhir asesmen, berdasarkan tingkat kompetensi membaca siswa yang teridentifikasi, akan diberikan rekomendasi pembelajaran yang yang sesuai untuk membantu siswa meningkatkan kompetensi membacanya.</Text>
      <TouchableOpacity style={styles.button} onPress={nextSlide}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginTop:10,
    marginBottom: 10,
    textAlign: 'justify',
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold:{
    fontWeight:'bold',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  logo: {
    width: 150, // Sesuaikan dengan ukuran logo Anda
    height: 150, // Sesuaikan dengan ukuran logo Anda
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
