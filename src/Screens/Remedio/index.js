import React, { useState, useEffect } from 'react';
import {
  View, Image, Pressable, FlatList, Modal, Alert, TouchableOpacity
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { Platform } from 'react-native';

export default function MedicationReminder() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeRemedio, setNomeRemedio] = useState('');
  const [intervalo, setIntervalo] = useState('');
  const [ultimaDose, setUltimaDose] = useState('');
  const [imagem, setImagem] = useState(null);
  const [medicamentos, setMedicamentos] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await Notifications.requestPermissionsAsync();
      carregarMedicamentos();
    })();
  }, []);

  const carregarMedicamentos = async () => {
    try {
      const dados = await AsyncStorage.getItem('medicamentosSalvos');
      if (dados) setMedicamentos(JSON.parse(dados));
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os medicamentos.');
    }
  };

  const salvarMedicamentos = async (lista) => {
    try {
      await AsyncStorage.setItem('medicamentosSalvos', JSON.stringify(lista));
    } catch {
      Alert.alert('Erro ao salvar os dados');
    }
  };

  async function tirarFoto() {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  async function agendarNotificacao(remedio) {
    if (Platform.OS === 'web') {
      // Não suporta notificações na web, retorna um horário fake ou vazio
      return { horario: 'Notificação não suportada na web' };
    }
  
    const [hours, minutes] = remedio.ultimaDose.split(':').map(Number);
    const agendamento = new Date();
    agendamento.setHours(hours, minutes, 0);
    agendamento.setHours(agendamento.getHours() + parseInt(remedio.intervalo));
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Hora do remédio: ${remedio.nome}`,
        body: 'É hora de tomar sua medicação.',
      },
      trigger: {
        seconds: (agendamento - new Date()) / 1000,
        repeats: false,
      },
    });
  
    return { horario: agendamento.toLocaleTimeString() };
  }
  

  const salvarOuAtualizarRemedio = async () => {
    if (!nomeRemedio.trim() || !intervalo.trim() || !ultimaDose.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }

    if (isNaN(intervalo)) {
      Alert.alert('Erro', 'O intervalo deve ser um número.');
      return;
    }

    try {
      const novoHistorico = await agendarNotificacao({
        nome: nomeRemedio,
        intervalo,
        ultimaDose,
      });

      const novoRemedio = {
        nome: nomeRemedio.trim(),
        intervalo: intervalo.trim(),
        ultimaDose: ultimaDose.trim(),
        imagem,
        historico: [novoHistorico],
      };

      let listaAtualizada;

      if (editandoIndex !== null) {
        listaAtualizada = [...medicamentos];
        listaAtualizada[editandoIndex] = novoRemedio;
      } else {
        listaAtualizada = [novoRemedio, ...medicamentos];
      }

      setMedicamentos(listaAtualizada);
      await salvarMedicamentos(listaAtualizada);

      // Resetar e fechar modal
      setNomeRemedio('');
      setIntervalo('');
      setUltimaDose('');
      setImagem(null);
      setEditandoIndex(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro ao salvar', 'Algo deu errado ao tentar salvar o remédio.');
    }
  };

  const removerRemedio = async (index) => {
    const listaAtualizada = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(listaAtualizada);
    await salvarMedicamentos(listaAtualizada);
  };

  const editarRemedio = (index) => {
    const r = medicamentos[index];
    setNomeRemedio(r.nome);
    setIntervalo(r.intervalo);
    setUltimaDose(r.ultimaDose);
    setImagem(r.imagem);
    setEditandoIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.goBack()} style={styles.home}>
          <Feather name="arrow-left-circle" size={28} color="#000" />
        </Pressable>
        <Text style={styles.Titulo}>Meus Remédios</Text>
      </View>

      <FlatList
        data={medicamentos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.digito}>{item.nome}</Text>
            {item.imagem && <Image source={{ uri: item.imagem }} style={styles.img} />}
            <Text style={styles.cardData}>Intervalo: {item.intervalo}h</Text>
            <Text style={styles.cardData}>Última dose: {item.ultimaDose}</Text>
            <Text style={styles.subTitulo}>Histórico:</Text>
            {item.historico.map((dose, i) => (
              <Text key={i} style={styles.cardData}>- {dose.horario}</Text>
            ))}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => editarRemedio(index)}
                style={[styles.button, { backgroundColor: '#FFA726' }]}
              >
                <Text style={{ color: '#fff' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removerRemedio(index)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={{ color: '#fff' }}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.cardData}>Nenhum remédio cadastrado ainda.</Text>}
      />

      {/* Modal de Cadastro/Edição */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{editandoIndex !== null ? 'Editar Remédio' : 'Novo Remédio'}</Text>

            <TextInput
              label="Nome do Remédio"
              style={styles.input}
              value={nomeRemedio}
              onChangeText={setNomeRemedio}
            />

            <TextInput
              label="Intervalo (em horas)"
              style={styles.input}
              keyboardType="numeric"
              value={intervalo}
              onChangeText={setIntervalo}
            />

            <TextInput
              label="Última dose (HH:MM)"
              style={styles.input}
              value={ultimaDose}
              onChangeText={setUltimaDose}
              placeholder="Ex: 08:00"
            />

            {/* Preview de Imagem e botão */}
            {imagem ? (
              <>
                <Image source={{ uri: imagem }} style={styles.previewImg} />
                <Pressable onPress={tirarFoto} style={[styles.button, { backgroundColor: '#FFA726', marginBottom: 10 }]}>
                  <Text style={{ color: '#fff' }}>Tirar outra foto</Text>
                </Pressable>
              </>
            ) : (
              <Pressable onPress={tirarFoto} style={[styles.button, { backgroundColor: '#2196F3', marginBottom: 10 }]}>
                <Text style={{ color: '#fff' }}>Tirar Foto</Text>
              </Pressable>
            )}

            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={salvarOuAtualizarRemedio}>
                <Text style={{ color: '#fff' }}>Salvar</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={() => {
                setModalVisible(false);
                setEditandoIndex(null);
              }}>
                <Text style={{ color: '#fff' }}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => {
        setEditandoIndex(null);
        setModalVisible(true);
      }} style={styles.floatingButton}>
        <Feather name="plus-circle" color="#fff" size={40} />
      </Pressable>
    </View>
  );
}
