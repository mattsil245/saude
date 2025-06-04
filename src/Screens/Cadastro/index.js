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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import styles from './styles';

export default function Cadastro({ navigation }) {
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
        const fileName = uri.split('/').pop();
        const destPath = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.copyAsync({
          from: uri,
          to: destPath,
        });
        return destPath;
      } catch (error) {
        console.log('Erro ao converter URI:', error);
        return uri;
      }
    }
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

  const enviarDados = async () => {
    if (!image) {
      alert('Selecione uma imagem!');
      return;
    }

    setUploading(true);
    const url = 'http://10.67.4.217:8000/api/usuarios/';

    try {
      let uriFinal = image.uri;
      if (Platform.OS !== 'web') {
        uriFinal = await normalizeUri(image.uri);
      }

      let file;
      if (Platform.OS === 'web') {
        const byteCharacters = atob(image.base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: image.type });
        file = new File([blob], image.name, { type: image.type });
      } else {
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
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Erro ao enviar dados: ' + errorText);
      }

      const data = await response.json();

     if (data.status === 'success' && data.usuario) {
  const { created_at, updated_at, ...usuarioLimpo } = data.usuario;

  await AsyncStorage.setItem('usuario', JSON.stringify(usuarioLimpo));

  // Atualiza o estado global do usuário para disparar troca de rotas
  props.setUsuario(usuarioLimpo);

  alert('Cadastro realizado com sucesso!');
}
 else {
  alert('Erro no cadastro, tente novamente.');
}

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
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
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
              title="Voltar"
              onPress={() => navigation.goBack()}
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
