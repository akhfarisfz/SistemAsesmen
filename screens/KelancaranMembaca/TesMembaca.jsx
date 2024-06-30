import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const TesMembaca = ({ navigation, route }) => {
    const { id } = route.params;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState(null);
    const [isBackPressed, setIsBackPressed] = useState(false);

    const handleRadioPress = (value) => {
        setSelectedId(value);
    };

    const handleSubmit = () => {
        if (selectedId) {
            // Navigasi ke layar berikutnya berdasarkan pilihan tes
            const selectedOption = radioButtonsData.find((item) => item.value === selectedId);
            if (selectedOption) {
                navigation.navigate(selectedOption.navigateTo, { id: id });
            }
        } else {
            alert('Harap pilih opsi sebelum mengirim.');
        }
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
                    <TouchableOpacity
                        style={[styles.backButton, isBackPressed && styles.backButtonPressed]}
                        onPressIn={() => setIsBackPressed(true)}
                        onPressOut={() => setIsBackPressed(false)}
                        onPress={handleBack}
                    >
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Petunjuk Tes Membaca</Text>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}>Halaman ini akan menampilkan kata</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}>Tunjukkan kata tersebut kepada siswa dan biarkan membaca sampai akhir</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}>
                            Jika siswa <Text style={styles.bold}>tidak bisa</Text> atau <Text style={styles.bold}>Tidak mampu meneruskan bacaan</Text>, maka siswa tidak perlu membaca sampai akhir.
                            Anda bisa melanjutkan pada kegiatan berikutnya
                        </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.item}>Isilah halaman berikutnya dengan kelancaran membaca siswa</Text>
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
                    <Text style={styles.title}>Bacalah Teks berikut</Text>
                    <Text style={styles.questionarea}>Anisa suka minum air. Dia tahu minum air itu sehat. Air juga bisa menghilangkan rasa haus. Sering minum air membuat badan Anisa terasa segar.</Text>
                    <TouchableOpacity style={styles.button} onPress={nextPage}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            )}

            {currentPage === 3 && (
                <View >
                    <TouchableOpacity
                        style={[styles.backButton, isBackPressed && styles.backButtonPressed]}
                        onPressIn={() => setIsBackPressed(true)}
                        onPressOut={() => setIsBackPressed(false)}
                        onPress={handleBack}
                    >
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
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
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%' }}>
                                    <RadioButton
                                        color={'#009688'}
                                        value={item.value}
                                        status={selectedId === item.value ? 'checked' : 'unchecked'}
                                        onPress={() => handleRadioPress(item.value)}
                                    />
                                    <Text style={styles.radioLabel}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
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

export default TesMembaca;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 12,
    },
    questionarea: {
        backgroundColor: '#ededed',
        padding: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        fontSize: 18,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
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
