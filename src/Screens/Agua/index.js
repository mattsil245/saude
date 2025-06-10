import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Modal, Button, TextInput } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function Agua() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [inputMedida, setInputMedida] = useState('');

  const salvarMedida = () => {
    // lógica de salvar medida
    console.log(`Medida salva: ${inputMedida}`);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <Feather style={styles.seta} name='arrow-left-circle' color={'#000'} size={28} />
        </Pressable>
        <Text style={styles.Titulo}>Agua</Text>
      </View>

      <Text style={styles.subTitulo}>Quantidade de Agua para se Tomar no Dia:</Text>

      <View style={styles.quantidade}>
        <Text style={styles.textQuantidade}>ex.: 2.000ml</Text>
      </View>

      <View style={styles.copos}>
        <Text>Copos d'Agua a serem tomados</Text>
      </View>

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
            <Button title="Salvar" onPress={salvarMedida} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text>Adicionar</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}
