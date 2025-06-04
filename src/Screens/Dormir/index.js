import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const dicasDormir = [
  "Mantenha um horário regular para dormir e acordar.",
  "Evite cafeína e comidas pesadas antes de dormir.",
  "Crie um ambiente tranquilo e escuro no quarto.",
  "Desligue eletrônicos pelo menos 30 minutos antes de dormir.",
  "Faça exercícios físicos regularmente, mas não perto da hora de dormir.",
  "Pratique técnicas de relaxamento, como meditação ou respiração profunda.",
];

export default function Dormir() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }} 
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay escuro para melhorar leitura */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.goBack()} style={styles.home}>
            <Feather name="arrow-left-circle" color="#fff" size={28} />
          </Pressable>
          <Text style={styles.Titulo}>Dicas para Dormir</Text>
        </View>

        {/* Conteúdo */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {dicasDormir.map((dica, index) => (
            <View key={index} style={styles.dicaCard}>
              <Text style={styles.dicaTexto}>{`\u2022 ${dica}`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
