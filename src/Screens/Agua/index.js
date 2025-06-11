import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Modal, Button, TextInput, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Agua() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [inputMedida, setInputMedida] = useState('');
  const [metaAgua, setMetaAgua] = useState(0);
  const [consumoAtual, setConsumoAtual] = useState(0);

  const getHoje = () => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0]; // ex: "2025-06-11"
  };

  // Carrega usuário e consumo do dia
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const userData = await AsyncStorage.getItem('usuario');
        if (userData) {
          const usuario = JSON.parse(userData);
          const peso = usuario.peso;
          const meta = peso * 35; // Ex: 35ml por kg
          setMetaAgua(meta);

          const consumoSalvo = await AsyncStorage.getItem(`consumo_agua_${getHoje()}`);
          setConsumoAtual(consumoSalvo ? parseInt(consumoSalvo) : 0);
        }
      } catch (e) {
        console.log('Erro ao carregar dados:', e);
      }
    };

    carregarDados();
  }, []);

  const salvarMedida = async () => {
    const medida = parseInt(inputMedida);
    if (isNaN(medida) || medida <= 0) {
      Alert.alert('Erro', 'Digite uma quantidade válida de água (em ml).');
      return;
    }

    try {
      const novoConsumo = consumoAtual + medida;
      await AsyncStorage.setItem(`consumo_agua_${getHoje()}`, novoConsumo.toString());
      setConsumoAtual(novoConsumo);
      setInputMedida('');
      setModalVisible(false);
    } catch (e) {
      console.log('Erro ao salvar consumo:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <Feather style={styles.seta} name='arrow-left-circle' color={'#000'} size={28} />
        </Pressable>
        <Text style={styles.Titulo}>Água</Text>
      </View>

      <Text style={styles.subTitulo}>Meta diária de água:</Text>
      <View style={styles.quantidade}>
        <Text style={styles.textQuantidade}>{metaAgua} ml</Text>
      </View>

      <View style={styles.copos}>
        <Text>Já consumido hoje:</Text>
        <Text style={{ fontWeight: 'bold' }}>{consumoAtual} ml</Text>
        <Text>Faltam: {Math.max(metaAgua - consumoAtual, 0)} ml</Text>
      </View>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.centerView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Digite sua última medida de água:</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputMedida}
        onChangeText={setInputMedida}
        placeholder="Ex: 250ml"
      />

<View style={styles.buttonRow}>
  <Pressable style={styles.modalButton} onPress={salvarMedida}>
    <Text style={styles.modalButtonText}>Salvar</Text>
  </Pressable>

  <Pressable
    style={[styles.modalButton, styles.cancelButton]}
    onPress={() => setModalVisible(false)}
  >
    <Text style={styles.modalButtonText}>Cancelar</Text>
  </Pressable>
</View>

    </View>
  </View>
</Modal>


<Pressable onPress={() => setModalVisible(true)} style={styles.addButton}>
  <Text style={styles.addButtonText}>Adicionar</Text>
</Pressable>


      <StatusBar style="auto" />
    </View>
  );
}
