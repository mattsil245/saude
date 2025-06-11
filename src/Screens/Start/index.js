import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Start() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) Para o Cuide-se Bem!</Text>
      

      <Pressable 
        style={[styles.button, { backgroundColor: 'rgb(50, 117, 129)'}]} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, { backgroundColor: 'rgb(76, 175, 162)' }]} 
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, { backgroundColor: 'rgb(100, 100, 100)' }]} 
        onPress={() => navigation.navigate('ConfigIP')}
      >
        <Text style={styles.buttonText}>⚙️ Configurar IP</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(169, 226, 203)',
    padding: 20,
  },
  title: {
    display:'flex',
    textAlign:'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'rgb(0, 53, 32)',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
