import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { Alert, Platform } from 'react-native';

export default function EditarPerfil({ navigation }) {
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
  const [usuarioId, setUsuarioId] = useState(null);

    function showAlert(title, message) {
    if (Platform.OS === 'web') {
        window.alert(`${title}\n\n${message}`);
    } else {
        Alert.alert(title, message);
    }
    }

    useEffect(() => {
      const carregarUsuario = async () => {
        const usuarioStr = await AsyncStorage.getItem('usuario');
        const ipSalvo = await AsyncStorage.getItem('ip');
    
        if (usuarioStr) {
          const usuario = JSON.parse(usuarioStr);
          setNome(usuario.nome || '');
          setEmail(usuario.email || '');
          setSenha(usuario.senha || '');
          setDataNasc(usuario.dataNasc || '');
          setGenero(usuario.genero || '');
          setAltura(String(usuario.altura || ''));
          setPeso(String(usuario.peso || ''));
          setUsuarioId(usuario.id);
    
          if (usuario.foto) {
            // Montar URI dinamicamente conforme plataforma
            let imageUri = '';
            if (Platform.OS === 'web') {
              imageUri = `http://127.0.0.1:8000/storage/${usuario.foto}`;
            } else {
              if (ipSalvo) {
                imageUri = `http://${ipSalvo}:8000/storage/${usuario.foto}`;
              } else {
                imageUri = ''; // ou alguma fallback
              }
            }
            setImage({
              uri: imageUri,
              name: 'foto.jpg',
              type: 'image/jpeg',
              base64: null,
            });
          }
        }
      };
    
      carregarUsuario();
    }, []);
    

  const normalizeUri = async (uri) => {
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
      try {
        const fileName = uri.split('/').pop();
        const destPath = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: uri, to: destPath });
        return destPath;
      } catch (error) {
        console.log('Erro ao converter URI:', error);
        return uri;
      }
    }
    return uri;
  };

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      const picked = resultado.assets[0];
      setImage({
        uri: picked.uri,
        name: picked.fileName || 'foto.jpg',
        type: picked.type || 'image/jpeg',
        base64: picked.base64,
      });
    }
  };

const salvarDados = async () => {
  if (!image) {
    showAlert('Atenção', 'Selecione uma imagem válida!');
    return;
  }

  setUploading(true);

  try {
    let url;
    const ipSalvo = await AsyncStorage.getItem('apiIP');
    if (Platform.OS === 'android') {
      if (!ipSalvo) {
        Alert.alert('Erro', 'IP do servidor não encontrado.');
        setUploading(false);
        return;
      }
      url = `http://${ipSalvo}:8000/api/usuarios/${usuarioId}/`;
    } else {
      url = `http://127.0.0.1:8000/api/usuarios/${usuarioId}/`;
    }

    let uriFinal = image.uri;
    if (Platform.OS !== 'web') {
      uriFinal = await normalizeUri(image.uri);
    }

    let file;
    if (Platform.OS === 'web') {
      // Converter base64 para Blob e depois para File no web
      const byteCharacters = atob(image.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: image.type });
      file = new File([blob], image.name, { type: image.type });
    } else {
      // No mobile, usar o URI normalizado
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
    formData.append('_method', 'PUT');

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Erro ao enviar dados: ' + errorText);
    }

    const data = await response.json();

if ((data.status === 'success' || data.success) && data.usuario) {
  const { created_at, updated_at, ...usuarioLimpo } = data.usuario;
  await AsyncStorage.setItem('usuario', JSON.stringify(usuarioLimpo));
  showAlert('Sucesso', 'Perfil atualizado com sucesso!');
  navigation.navigate('Home');
}


  } catch (error) {
    console.error('Erro:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
  } finally {
    setUploading(false);
  }
};


  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput value={nome} onChangeText={setNome} style={styles.input} />

        <Text style={styles.label}>Email:</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} />

        <Text style={styles.label}>Senha:</Text>
        <TextInput value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />

        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput value={dataNasc} onChangeText={setDataNasc} style={styles.input} />

        <Text style={styles.label}>Gênero:</Text>
        <TextInput value={genero} onChangeText={setGenero} style={styles.input} />

        <Text style={styles.label}>Altura:</Text>
        <TextInput value={altura} onChangeText={setAltura} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>Peso:</Text>
        <TextInput value={peso} onChangeText={setPeso} keyboardType="numeric" style={styles.input} />

        <Pressable style={styles.botao} onPress={escolherImagem}>
          <Text style={styles.textoBotao}>Escolher Foto</Text>
        </Pressable>

        {image && image.uri ? (
  <Image source={{ uri: image.uri }} style={styles.imagePreview} />
) : (
  <Image source={require('../../../assets/img/fotoPerfil.jpeg')} style={styles.imagePreview} />
)}

        <Pressable style={styles.botao} onPress={salvarDados} disabled={uploading}>
          <Text style={styles.textoBotao}>{uploading ? 'Salvando...' : 'Salvar Alterações'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
