import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ConfigIP() {
  const [ip, setIp] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('apiIP').then((value) => {
      if (value) setIp(value);
    });
  }, []);

  const salvarIP = async () => {
    if (!ip) {
      Alert.alert("Erro", "Digite um IP válido!");
      return;
    }

    await AsyncStorage.setItem('apiIP', ip);
    Alert.alert("Sucesso", "IP salvo com sucesso!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o IP do servidor:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 192.168.0.105"
        value={ip}
        onChangeText={setIp}
      />

      <Pressable style={styles.button} onPress={salvarIP}>
        <Text style={styles.buttonText}>Salvar IP</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgb(50, 117, 129)',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  }
});
