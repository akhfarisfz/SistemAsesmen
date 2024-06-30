import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const MembacaParagraf = ({ route, navigation }) => {
    const { id } = route.params;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLetters, setSelectedLetters] = useState({});
    const [score, setScore] = useState(20);
    const [isBackPressed, setIsBackPressed] = useState(false);

    const handleSubmit = () => {
        const newKategori = 'Intervensi Khusus Tingkat Kata';
        navigation.navigate('Hasil Asesmen', { Kategori: newKategori, id: id }); // Navigasi dengan Kategori yang sudah dimodifikasi
    };
    const dataSoalKata = useMemo(() => ([
        { id: '1', label: 'Di', value: 1 },
        { id: '2', label: 'pagi', value: 1 },
        { id: '3', label: 'yang', value: 1 },
        { id: '4', label: 'cerah', value: 1 },
        { id: '5', label: 'Awan', value: 1 },
        { id: '6', label: 'melayang', value: 1 },
        { id: '7', label: 'di', value: 1 },
        { id: '8', label: 'langit', value: 1 },
        { id: '9', label: 'biru', value: 1 },
        { id: '10', label: 'Burung-burung', value: 1 },
        { id: '11', label: 'menyanyikan', value: 1 },
        { id: '12', label: 'lagu', value: 1 },
        { id: '13', label: 'indahnya', value: 1 },
        { id: '14', label: 'Bunga-bunga', value: 1 },
        { id: '15', label: 'mekar', value: 1 },
        { id: '16', label: 'di', value: 1 },
        { id: '17', label: 'tepi', value: 1 },
        { id: '18', label: 'jalan', value: 1 },
        { id: '19', label: 'Zaman', value: 1 },
        { id: '20', label: 'terus', value: 1 },
    ]), []);



    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            navigation.goBack();
        }
    };

    const toggleSelectLetter = (id, value) => {
        setSelectedLetters(prev => {
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
            {currentPage == 1 && (
                <View>
                    <Text style={styles.title}>Petunjuk Membaca Paragraf</Text>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}>Di halaman berikut, akan tampil kata kata dalam paragraf yang harus dibaca siswa.</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}>Mintalah siswa membaca semua kata satu persatu, dari kiri ke kanan. Mulai dari baris pertama berlanjut ke baris berikutnya dan seterusnya.</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}><Text style={styles.bold}>Tekan kata </Text> Jika siswa tidak bisa menyebutkan kata dan <Text style={styles.bold}>biarkan</Text> apabila siswa dapat menyebutkan huruf.</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}><Text style={styles.bold}>Tekan kata </Text> Jika siswa tidak bisa menyebutkan kata dan <Text style={styles.bold}>biarkan</Text> apabila siswa dapat menyebutkan huruf.</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}>Jika siswa tidak selesai membaca suatu kata lebih dari 3 detik, maka dianggap salah. Mintalah siswa melanjutkan ke kata berikutnya.</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={nextPage}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            )}
            {currentPage == 2 && (
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
                    <Text style={styles.title}>Membaca Paragraf</Text>
                    <View style={styles.lettersContainer}>
                        {dataSoalKata.map(letter => (
                            <Text
                                key={letter.id}
                                style={[
                                    styles.questionarea,
                                    selectedLetters[letter.id] && styles.selected
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

export default MembacaParagraf;

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
        fontSize: 15,
        fontWeight: 'bold',
        margin: 1,
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bullet: {
        marginRight: 5,
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
