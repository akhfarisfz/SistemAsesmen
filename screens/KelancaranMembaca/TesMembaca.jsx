import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

const TesMembaca = ({ navigation, route }) => {
    const {id}=route.params;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState(null);

    const handleRadioPress = (value) => {
        setSelectedId(value);
    };
    console.log(id)
    const handleSubmit = () => {
        if (selectedId) {
            // Navigasi ke layar berikutnya berdasarkan pilihan tes
            const selectedOption = radioButtonsData.find((item) => item.value === selectedId);
            if (selectedOption) {
                navigation.navigate(selectedOption.navigateTo,{id:id});
            }
        } else {
            alert('Harap pilih opsi sebelum mengirim.');
        }
    };

    

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Data radio buttons untuk tes membaca
    const radioButtonsData = [
        {
            id: '1',
            label: 'Siswa tidak mampu membaca satu kata pun',
            value: 'pilihan 1',
            navigateTo: 'Membaca Huruf',
        },
        {
            id: '2',
            label: 'Siswa mampu membaca kata per kata dengan mengeja',
            value: 'pilihan 2',
            navigateTo: 'Membaca Huruf',
        },
        {
            id: '3',
            label: 'Siswa mampu membaca seluruh teks namun lamban dalam kata tertentu',
            value: 'pilihan 3',
            navigateTo: 'Membaca Paragraf',
        },
        {
            id: '4',
            label: 'Siswa mampu membaca seluruh teks dengan lancar',
            value: 'pilihan 4',
            navigateTo: 'Soal Cerita',
        },
    ];

    return (
        <View style={styles.container}>
            {currentPage === 1 && (
                <View>
                    <Text style={styles.title}>Petunjuk Tes Membaca</Text>
                    <Text style={styles.item}>{`\u2022 Halaman ini akan menampilkan kata`}</Text>
                    <Text style={styles.item}>{`\u2022`} Tunjukkan kata tersebut kepada siswa dan biarkan membaca sampai akhir</Text>
                    <Text style={styles.item}>{`\u2022`} Jika siswa <Text style={styles.bold}>tidak bisa</Text> atau <Text style={styles.bold}>Tidak mampu meneruskan bacaan</Text> maka siswa tidak perlu membaca sampai akhir.
                        Anda bisa melanjutkan pada kegiatan berikutnya </Text>
                    <Text style={styles.item}>{`\u2022`} Isilah halaman berikutnya dengan kelancaran membaca siswa </Text>
                    <Button mode='outlined' onPress={nextPage}>Next</Button>
                </View>
            )}

            {currentPage === 2 && (
                <View>
                    <Text style={styles.title}>Bacalah Teks berikut</Text>
                    <Text style={styles.questionarea}>Anisa suka minum air. Dia tahu minum air itu sehat. Air juga bisa menghilangkan rasa haus. Sering minum air membuat badan Anisa terasa segar.</Text>
                    <Button mode='outlined' onPress={previousPage}>Previous</Button>
                    <Button mode='outlined' onPress={nextPage}>Next</Button>
                </View>
            )}

            {currentPage === 3 && (
                <View style={styles.alignLeft}>
                    <Text style={styles.title}>
                        Bagaimana kelancaran siswa dalam membaca teks bacaan?
                    </Text>
                    <View style={styles.radioContainer}>
                        {radioButtonsData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.radioItem}
                                onPress={() => handleRadioPress(item.value)}
                            >
                                <RadioButton
                                    value={item.value}
                                    status={selectedId === item.value ? 'checked' : 'unchecked'}
                                    onPress={() => handleRadioPress(item.value)}
                                />
                                <Text style={styles.radioLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Button mode='outlined' onPress={previousPage}>Previous</Button>
                    <Button mode='outlined' onPress={handleSubmit}>Submit</Button>
                </View>
            )}
        </View>
    );
};

export default TesMembaca;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 12
    },
    questionarea: {
        backgroundColor: '#ededed',
        padding: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
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
    alignLeft: {
        alignItems: 'flex-start',
    },
    radioContainer: {
        marginVertical: 10,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        flexWrap: 'wrap',
    },
    radioLabel: {
        marginLeft: 10,
    }
});
