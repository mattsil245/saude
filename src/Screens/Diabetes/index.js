import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text, View, Pressable, Modal, Button, TextInput, FlatList, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Diabetes() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputMedida, setInputMedida] = useState('');
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const dados = await AsyncStorage.getItem('medidasGlicose');
      if (dados) {
        setHistorico(JSON.parse(dados));
      }
    } catch (err) {
      Alert.alert('Erro ao carregar os dados');
    }
  };

  const salvarMedida = async () => {
    if (!inputMedida.trim()) {
      Alert.alert('Digite uma medida válida');
      return;
    }

    const novaMedida = {
      valor: inputMedida,
      data: new Date().toLocaleString()
    };

    const novoHistorico = [novaMedida, ...historico];
    try {
      await AsyncStorage.setItem('medidasGlicose', JSON.stringify(novoHistorico));
      setHistorico(novoHistorico);
      setInputMedida('');
      setModalVisible(false);
    } catch (err) {
      Alert.alert('Erro ao salvar');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <Feather name='arrow-left-circle' size={28} color={'#000'} />
        </Pressable>
        <Text style={styles.Titulo}>Diabetes</Text>
      </View>

      <Text style={styles.subTitulo}>Última medida registrada:</Text>
      <View style={styles.card}>
        {historico.length > 0 ? (
          <>
            <Text style={styles.digito}>Glicose: {historico[0].valor} mg/dL</Text>
            <Text style={styles.cardData}>{historico[0].data}</Text>
          </>
        ) : (
          <Text style={styles.cardData}>Nenhuma medida registrada</Text>
        )}
      </View>

      <Text style={styles.subTitulo}>Histórico:</Text>
      <FlatList
        data={historico.slice(1)} // Exclui a última que já está exibida acima
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.digito}>Glicose: {item.valor} mg/dL</Text>
            <Text style={styles.cardData}>{item.data}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.cardData}>Nenhum dado anterior.</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Digite sua última medida de glicose:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputMedida}
              onChangeText={setInputMedida}
              placeholder="Ex: 120"
            />
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={salvarMedida}>
                <Text style={{ color: '#fff' }}>Salvar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#fff' }}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)} style={styles.floatingButton}>
        <Feather name='plus-circle' color={'#fff'} size={40} />
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}
