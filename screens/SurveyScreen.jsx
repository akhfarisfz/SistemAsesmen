import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function SurveyScreen({ navigation }) {
  const handleSurveySubmit = (answer) => {
    navigation.navigate('Result', { answer });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How satisfied are you with our service?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff', borderColor: '#007bff' }]}
          onPress={() => handleSurveySubmit('Sangat Baik')}
        >
          <Text style={[styles.buttonText, { color: '#007bff' }]}>Sangat Baik</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff', borderColor: '#007bff' }]}
          onPress={() => handleSurveySubmit('Baik')}
        >
          <Text style={[styles.buttonText, { color: '#007bff' }]}>Baik</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff', borderColor: '#007bff' }]}
          onPress={() => handleSurveySubmit('Cukup')}
        >
          <Text style={[styles.buttonText, { color: '#007bff' }]}>Cukup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff', borderColor: '#007bff' }]}
          onPress={() => handleSurveySubmit('Kurang')}
        >
          <Text style={[styles.buttonText, { color: '#007bff' }]}>Kurang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff', borderColor: '#007bff' }]}
          onPress={() => handleSurveySubmit('Sangat Kurang')}
        >
          <Text style={[styles.buttonText, { color: '#007bff' }]}>Sangat Kurang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
