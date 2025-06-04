import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

export default function Frases({ navigation }) {
  const [frase, setFrase] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para traduzir usando API MyMemory
  const traduzirFrase = async (texto, targetLang = 'pt') => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      texto
    )}&langpair=en|${targetLang}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.responseData.translatedText || texto;
    } catch (error) {
      console.error('Erro na tradução:', error);
      return texto;
    }
  };

  // Busca frase e traduz
  const buscarFrase = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.allorigins.win/get?url=' +
          encodeURIComponent('https://zenquotes.io/api/random')
      );
      const data = await response.json();
      const fraseObj = JSON.parse(data.contents);
      const textoOriginal = fraseObj[0].q + ' — ' + fraseObj[0].a;

      const fraseTraduzida = await traduzirFrase(textoOriginal, 'pt');
      setFrase(fraseTraduzida);
    } catch (error) {
      setFrase('Erro ao buscar frase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarFrase();
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/800/1200?blur=1&grayscale' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
            <Feather style={styles.seta} name="arrow-left-circle" color="#fff" size={30} />
          </Pressable>
          <Text style={styles.Titulo}>Frases Motivacionais</Text>
        </View>

        {/* Área da frase */}
        <View style={styles.fraseContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.frase}>{frase}</Text>
          )}
        </View>

        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

