import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { answer } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Thank you for your feedback!</Text>
      <Text style={styles.resultText}>You selected: {answer}</Text>
      <Button title="Back to Survey" onPress={() => navigation.navigate('Survey')} />
      <Button title="Terimakasih" onPress={() => console.log('Terimakasih button pressed')} />
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
  resultText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
