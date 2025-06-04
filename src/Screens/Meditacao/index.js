import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons'; // Ícone de seta para voltar
import { useNavigation } from '@react-navigation/native';

const audios = [
  { id: 'relax1', nome: 'Relaxamento 1', arquivo: require('../../../assets/som/relaxamento1.mp3') },
  { id: 'relax2', nome: 'Relaxamento 2', arquivo: require('../../../assets/som/relaxamento2.mp3') },
  { id: 'sono1', nome: 'Sono Profundo', arquivo: require('../../../assets/som/sono1.mp3') },
  { id: 'sono2', nome: 'Sono Leve', arquivo: require('../../../assets/som/sono2.mp3') },
];

export default function AudioListPlayer() {
  const [sound, setSound] = useState(null);
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const positionInterval = useRef(null);
  const navigation = useNavigation();

  const tocarAudio = async (audio) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(audio.arquivo);
    setSound(newSound);
    setCurrentAudioId(audio.id);
    newSound.setOnPlaybackStatusUpdate(updateStatus);
    await newSound.playAsync();
    setIsPlaying(true);
    startProgressUpdater();
  };

  const updateStatus = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 1);
    }
  };

  const startProgressUpdater = () => {
    if (positionInterval.current) clearInterval(positionInterval.current);
    positionInterval.current = setInterval(async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        updateStatus(status);
      }
    }, 500);
  };

  const pausarAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const continuarAudio = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pararAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (positionInterval.current) {
        clearInterval(positionInterval.current);
      }
    };
  }, [sound]);

  const formatMillis = (millis) => {
    const totalSec = Math.floor(millis / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.audioCard}>
      <Text style={styles.audioNome}>{item.nome}</Text>
      {currentAudioId === item.id && (
        <View style={styles.controls}>
          <TouchableOpacity onPress={isPlaying ? pausarAudio : continuarAudio} style={styles.controlButton}>
            <Text style={styles.controlText}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pararAudio} style={styles.controlButton}>
            <Text style={styles.controlText}>⏹️</Text>
          </TouchableOpacity>
        </View>
      )}
      <Button style={{backgroundColor: '#ff00d5' }}title="Tocar" onPress={() => tocarAudio(item)} />
      {currentAudioId === item.id && (
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#1EB1FC"
            onSlidingComplete={async (val) => {
              if (sound) await sound.setPositionAsync(val);
            }}
          />
          <Text style={styles.time}>
            {formatMillis(position)} / {formatMillis(duration)}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}> {/* Fundo branco para a tela toda */}
      {/* Cabeçalho fixo com botão de voltar e título da página */}
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.goBack()} style={styles.home}>
          <Feather name="arrow-left-circle" size={30} color="#fa08d1" />
        </Pressable>
        <Text style={styles.Titulo}>Meditação</Text>
      </View>

      <FlatList
        data={audios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    padding: 15,
    
  },
  home: {
    marginRight: 12,
  },
  seta: {
    marginRight: 4,
  },
  Titulo: {
    color:'#fa08d1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#ffcaf6', // cor de fundo da área do conteúdo
  },
  audioCard: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  audioNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  controlButton: {
    padding: 10,
    backgroundColor: '#1EB1FC',
    borderRadius: 8,
  },
  controlText: {
    fontSize: 18,
    color: '#fff',
  },
  sliderContainer: {
    marginTop: 8,
    backgroundColor: '#ff00d5',
  },
  time: {
    fontSize: 14,
    color: '#444',
    textAlign: 'right',
    marginTop: 4,
  },
});
