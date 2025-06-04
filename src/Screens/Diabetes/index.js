import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Modal, Button, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Diabetes() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [ultimaMedida, setUltimaMedida] = useState('');
  const [inputMedida, setInputMedida] = useState('');

  const salvarMedida = () => {
    setUltimaMedida(inputMedida);
    setInputMedida('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <Feather style={styles.seta} name='arrow-left-circle' color={'#000'} size={28} />
        </Pressable>
        <Text style={styles.Titulo}>Diabetes</Text>
      </View>

      <View style={styles.sub}>
        <Text style={styles.SubTitulo}>Registre sua última medida de Glicose</Text>
      </View>
      
      <View style={styles.sub}>
        <Text style={styles.SubTitulo}>
          Última medida registrada: {ultimaMedida ? ultimaMedida + " mg/dL" : "Nenhuma"}
        </Text>
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
        <Feather name='plus-circle' color={'#000'} size={50} />
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}
