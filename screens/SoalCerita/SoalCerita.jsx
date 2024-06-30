import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, Checkbox, RadioButton } from 'react-native-paper';
import gambarSoalCerita from '../../assets/GambarSoalCerita.png'

const SoalCerita = ({ route, navigation }) => {
    const { id } = route.params;
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedDasar1, setCheckedDasar1] = useState(false);
    const [checkedDasar2, setCheckedDasar2] = useState(false);
    const [checkedDasar3, setCheckedDasar3] = useState(false);

    const [checkedCakap1, setCheckedCakap1] = useState(false);
    const [checkedCakap2, setCheckedCakap2] = useState(false);
    const [checkedCakap3, setCheckedCakap3] = useState(false);
    const [checkedCakap4, setCheckedCakap4] = useState(false);
    const [checkedCakap5, setCheckedCakap5] = useState(false);

    const [selectedValue, setSelectedValue] = useState('option1');

    const handleSubmitDasar = () => {
        if (checkedDasar1 && checkedDasar2) {
            setCurrentPage(currentPage + 1);
        } else {
            console.log("Jawaban Salah.");
            const Kategori = 'Intervensi Khusus Tingkat Cerita'
            navigation.navigate('Hasil Asesmen', { Kategori: Kategori, id: id }); // Navigasi dengan Kategori yang sudah dimodifikasi

        }
    };

    const handleSubmitCakap = () => {
        if (checkedCakap1 && checkedCakap2 && checkedCakap3) {
            setCurrentPage(currentPage + 1);
        } else {
            console.log("Jawaban Salah.");
            const Kategori = 'Level Dasar'
            navigation.navigate('Hasil Asesmen', { Kategori: Kategori, id: id }); // Navigasi dengan Kategori yang sudah dimodifikasi

        }
    };
    const handleSubmitMahir = (value) => {
        console.log('Selected Value:', selectedValue);
        if (selectedValue == 'benar') {
            let newKategori = 'Tingkat Mahir';
            navigation.navigate('Hasil Asesmen', { Kategori: newKategori, id:id }); // Navigasi dengan Kategori yang sudah dimodifikasi
        }
        else{
            let newKategori = 'Tingkat Cakap';
            navigation.navigate('Hasil Asesmen', { Kategori: newKategori, id:id }); // Navigasi dengan Kategori yang sudah dimodifikasi
        }

    };
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <View style={styles.container}>
            {currentPage === 1 && (
                <ScrollView>
                    <Text>Tes Pemahaman Soal Cerita</Text>
                    <Text style={styles.item}>{`\u2022`} Siswa telah mampu membaca dengan lancar. Selanjutnya adalah mengukur kemampuan siswa memahami bacaan.</Text>
                    <Text style={styles.item}>{`\u2022`} Di halaman berikutnya, akan tampil teks bacaan dengan ilustrasi.</Text>
                    <Text style={styles.item}>{`\u2022`} Minta siswa membaca dan menjawab pertanyaan di bawahnya.</Text>
                    <Button mode='outlined' onPress={nextPage}>Next</Button>
                </ScrollView>
            )}
            {currentPage == 2 && (
                <ScrollView>
                    <Text style={styles.title}>Tingkat Dasar</Text>
                    <View style={styles.questionarea}>
                        <Text style={styles.bold}>Siti dan Udin di Jalan.</Text>
                        <Text>Siti dan Udin namanya. Muka mereka penuh debu.
                            Dengan baju rombengan, mereka menyanyi di tengah kebisingan.
                            Pagi sampai malam, mereka tersenyum dalam peluh, menyapa om dan tante, mengharap receh seadanya.
                            Beribu Siti dan Udin berkeliaran di jalan-jalan, dengan suara serak dan napas yang sesak oleh polusi.
                            Kalau hari ini bisa makan, alhamdulillah.
                            Siti dan Udin tetap berdoa agar mereka bisa sekolah dan punya rumah berjendela.
                            (Februari 2003)
                        </Text>
                        <Image
                            source={gambarSoalCerita}
                            style={styles.logo}
                        />
                        <Text style={styles.bold}>Manakah keadaan yang sesuai dengan isi bacaan?</Text>
                        <Text style={styles.petunjuk}>Beri tanda centang ✔ pada setiap pernyataan yang benar </Text>
                        <Checkbox.Item
                            label="Siti dan Udin ingin bisa sekolah"
                            status={checkedDasar1 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedDasar1(!checkedDasar1)}
                        />
                        <Checkbox.Item
                            label="Siti dan Udin menyanyi sampai sore"
                            status={checkedDasar2 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedDasar2(!checkedDasar2)}
                        />
                        <Checkbox.Item
                            label="Siti dan Udin memakai Baju Rombengan"
                            status={checkedDasar3 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedDasar3(!checkedDasar3)}
                        />

                    </View>
                    <Button mode="contained" onPress={handleSubmitDasar}>
                        Submit
                    </Button>
                </ScrollView >
            )}
            {currentPage == 3 && (
                <ScrollView>
                    <Text style={styles.title}>Tingkat Cakap</Text>
                    <View style={styles.questionarea}>
                        <Text style={styles.bold}>Siti dan Udin di Jalan.</Text>
                        <Text>Siti dan Udin namanya. Muka mereka penuh debu.
                            Dengan baju rombengan, mereka menyanyi di tengah kebisingan.
                            Pagi sampai malam, mereka tersenyum dalam peluh, menyapa om dan tante, mengharap receh seadanya.
                            Beribu Siti dan Udin berkeliaran di jalan-jalan, dengan suara serak dan napas yang sesak oleh polusi.
                            Kalau hari ini bisa makan, alhamdulillah.
                            Siti dan Udin tetap berdoa agar mereka bisa sekolah dan punya rumah berjendela.
                            (Februari 2003)
                        </Text>
                        <Image
                            source={gambarSoalCerita}
                            style={styles.logo}
                        />
                        <Text style={styles.bold}>Manakah yang termasuk sifat Udin dan Siti?</Text>
                        <Text style={styles.petunjuk}>Beri tanda centang ✔ pada setiap pernyataan yang benar </Text>

                        <Checkbox.Item
                            label="Pekerja Keras"
                            status={checkedCakap1 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedCakap1(!checkedCakap1)}
                        />
                        <Checkbox.Item
                            label="Sabar"
                            status={checkedCakap2 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedCakap2(!checkedCakap2)}
                        />
                        <Checkbox.Item
                            label="Ramah"
                            status={checkedCakap3 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedCakap3(!checkedCakap3)}
                        />
                        <Checkbox.Item
                            label="Boros"
                            status={checkedCakap4 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedCakap4(!checkedCakap4)}
                        />
                        <Checkbox.Item
                            label="Pemalu"
                            status={checkedCakap5 ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedCakap5(!checkedCakap5)}
                        />

                    </View>
                    <Button mode="contained" onPress={handleSubmitCakap}>
                        Submit
                    </Button>
                </ScrollView >
            )}
            {currentPage == 4 && (
                <ScrollView>
                    <Text style={styles.title}>Tingkat Mahir</Text>
                    <View style={styles.questionarea}>
                        <Text style={styles.bold}>Siti dan Udin di Jalan.</Text>
                        <Text>Siti dan Udin namanya. Muka mereka penuh debu.
                            Dengan baju rombengan, mereka menyanyi di tengah kebisingan.
                            Pagi sampai malam, mereka tersenyum dalam peluh, menyapa om dan tante, mengharap receh seadanya.
                            Beribu Siti dan Udin berkeliaran di jalan-jalan, dengan suara serak dan napas yang sesak oleh polusi.
                            Kalau hari ini bisa makan, alhamdulillah.
                            Siti dan Udin tetap berdoa agar mereka bisa sekolah dan punya rumah berjendela.
                            (Februari 2003)
                        </Text>
                        <Image
                            source={gambarSoalCerita}
                            style={styles.logo}
                        />
                        <Text style={styles.bold}>Mengapa gambar tersebut sesuai dengan isi bacaan ?</Text>
                        <Text style={styles.petunjuk}>Siswa dipersilahkan menjawab alasannya </Text>

                    </View>
                    <Button mode="contained" onPress={nextPage}>
                        Next
                    </Button>
                </ScrollView >
            )}
            {currentPage == 5 && (
                <ScrollView>
                    <Text style={styles.title}>Kunci Jawaban Tingkat Mahir</Text>
                    <View style={styles.area}>
                        <Text style={styles.bold}>Kunci Jawaban</Text>
                        <Text style={styles.italic}>
                            Karena gambar tersebut menunjukkan dua orang anak yang sedang memainkan alat musik di jalan dengan wajah riang sehingga sesuai dengan teks puisi.
                        </Text>
                        <Text>Jawaban siswa BENAR, jika mengandung pengertian sebagaimana kunci jawaban di atas.</Text>
                        <Text>Apakah jawaban siswa Benar atau salah?</Text>
                        <RadioButton.Group
                            onValueChange={(value) => setSelectedValue(value)}
                            value={selectedValue}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton value="benar" color="blue" />
                                <Text>Benar</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton value="salah" color="red" />
                                <Text>Salah</Text>
                            </View>
                        </RadioButton.Group>
                        <Button mode="contained" onPress={handleSubmitMahir}>
                            Submit
                        </Button>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default SoalCerita;

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
        margin: 20,
    },
    item: {
        fontSize: 12,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic',
        marginVertical: 20,
        fontSize: 20
    },
    questionarea: {
        backgroundColor: '#ededed',
        padding: 20,
        fontSize: 16,
        marginBottom: 20
    },
    logo: {
        width: 150, // Sesuaikan dengan ukuran logo Anda
        height: 150, // Sesuaikan dengan ukuran logo Anda
        alignSelf: 'center',
        marginVertical: 20,
    },
    petunjuk: {
        fontSize: 12,
        color: 'gray',
        fontStyle: 'italic'
    },
    area: {
        marginVertical: 20,
        fontSize: 22
    }
});
