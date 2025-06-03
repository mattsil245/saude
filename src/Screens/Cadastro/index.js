import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StatusBar,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';

export default function Cadastro() {
  const insets = useSafeAreaInsets();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [genero, setGenero] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos da sua permissão para acessar a câmera.'
        );
      }
    })();
  }, []);

  async function normalizeUri(uri) {
  if (Platform.OS === 'android' && uri.startsWith('content://')) {
    try {
      // Caminho temporário para salvar a cópia do arquivo
      const fileName = uri.split('/').pop();
      const destPath = `${FileSystem.cacheDirectory}${fileName}`;

      // Copia o arquivo content:// para file://
      await FileSystem.copyAsync({
        from: uri,
        to: destPath,
      });

      return destPath; // agora com file://
    } catch (error) {
      console.log('Erro ao converter URI:', error);
      return uri; // fallback para URI original
    }
  }

  // Para iOS ou se já for file://, retorna uri direto
  return uri;
}

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const picked = result.assets[0];
      setImage({
        uri: picked.uri,
        base64: picked.base64,
        name: picked.fileName || 'foto.jpg',
        type: picked.type || 'image/jpeg',
      });
    }
  }

  function base64ToBlob(base64, mime = '') {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }

const enviarDados = async () => {
  if (!image) {
    alert('Selecione uma imagem!');
    return;
  }

  setUploading(true);
  const url = 'http://10.67.4.72:8082/api/usuarios/';

  try {
    let uriFinal = image.uri;
    if (Platform.OS !== 'web') {
      uriFinal = await normalizeUri(image.uri);
    }

    let file;
    if (Platform.OS === 'web') {
      // converte base64 para Blob
      const blob = base64ToBlob(image.base64, image.type);
      file = new File([blob], image.name, { type: image.type });
    } else {
      // no mobile, use o objeto com uri normalizada
      file = {
        uri: uriFinal,
        name: image.name,
        type: image.type,
      };
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('dataNasc', dataNasc);
    formData.append('genero', genero);
    formData.append('altura', altura);
    formData.append('peso', peso);
    formData.append('foto', file);

    const response = await fetch(url, {
      method: 'POST',
      // NÃO setar Content-Type aqui, o fetch cuida disso automaticamente
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Erro ao enviar dados: ' + errorText);
    }

    alert('Cadastro realizado com sucesso!');
  } catch (error) {
    console.error('Erro no fetch:', error);
    alert('Erro ao enviar os dados.');
  } finally {
    setUploading(false);
  }
};



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.Titulo}>Cadastre-se</Text>
        <Pressable onPress={pickImage}>
          <View style={styles.fotoUsuario}>
            {image?.uri ? (
              <Image source={{ uri: image.uri }} style={styles.perfil} />
            ) : (
              <Image
                style={styles.perfil}
                source={require('../../../assets/img/fotoPerfil.jpeg')}
              />
            )}
          </View>
        </Pressable>

        <View style={styles.formulario}>
          <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <View style={styles.linha}>
            <TextInput
              style={styles.inputMetade}
              placeholder="Data de Nascimento (YYYY-MM-DD)"
              value={dataNasc}
              onChangeText={setDataNasc}
            />
            <TextInput
              style={styles.inputMetade}
              placeholder="Gênero"
              value={genero}
              onChangeText={setGenero}
            />
          </View>

          <View style={styles.linha}>
            <TextInput
              style={styles.inputMetade}
              placeholder="Altura (em cm)"
              value={altura}
              onChangeText={setAltura}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.inputMetade}
              placeholder="Peso (em kg)"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={uploading ? 'Enviando...' : 'Cadastrar'}
              onPress={enviarDados}
              color="#32815A"
              disabled={uploading}
            />
            <Button
              title="Cancelar"
              onPress={() => console.log('Cancelado')}
              color="#646464"
              disabled={uploading}
            />
          </View>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
