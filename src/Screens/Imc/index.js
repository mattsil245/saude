import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, FlatList, Image, Pressable} from 'react-native';
import styles from './styles';
import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imcData = {
  crianca: {
    homens: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 14.5' },
      { id: 2, categoria: 'Peso normal', imc: '14.5 – 18.0' },
      { id: 3, categoria: 'Sobrepeso', imc: '18.1 – 21.0' },
      { id: 4, categoria: 'Obesidade', imc: '> 21.0' }
    ],
    mulheres: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 14.2' },
      { id: 2, categoria: 'Peso normal', imc: '14.2 – 18.5' },
      { id: 3, categoria: 'Sobrepeso', imc: '18.6 – 21.5' },
      { id: 4, categoria: 'Obesidade', imc: '> 21.5' }
    ]
  },
  adolescente: {
    homens: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 17.0' },
      { id: 2, categoria: 'Peso normal', imc: '17.1 – 22.5' },
      { id: 3, categoria: 'Sobrepeso', imc: '22.6 – 26.0' },
      { id: 4, categoria: 'Obesidade', imc: '> 26.0' }
    ],
    mulheres: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 16.8' },
      { id: 2, categoria: 'Peso normal', imc: '16.9 – 23.0' },
      { id: 3, categoria: 'Sobrepeso', imc: '23.1 – 26.5' },
      { id: 4, categoria: 'Obesidade', imc: '> 26.5' }
    ]
  },
  adulto: {
    homens: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 18.5' },
      { id: 2, categoria: 'Peso normal', imc: '18.5 – 24.9' },
      { id: 3, categoria: 'Sobrepeso', imc: '25.0 – 29.9' },
      { id: 4, categoria: 'Obesidade', imc: '> 30.0' }
    ],
    mulheres: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 18.0' },
      { id: 2, categoria: 'Peso normal', imc: '18.0 – 24.5' },
      { id: 3, categoria: 'Sobrepeso', imc: '24.6 – 29.5' },
      { id: 4, categoria: 'Obesidade', imc: '> 29.5' }
    ]
  },
  idoso: {
    homens: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 21.0' },
      { id: 2, categoria: 'Peso normal', imc: '21.0 – 26.9' },
      { id: 3, categoria: 'Sobrepeso', imc: '27.0 – 30.9' },
      { id: 4, categoria: 'Obesidade', imc: '> 31.0' }
    ],
    mulheres: [
      { id: 1, categoria: 'Abaixo do peso', imc: '< 21.5' },
      { id: 2, categoria: 'Peso normal', imc: '21.5 – 26.5' },
      { id: 3, categoria: 'Sobrepeso', imc: '26.6 – 30.5' },
      { id: 4, categoria: 'Obesidade', imc: '> 30.5' }
    ]
  }
};

export default function Imc() {
  const navigation = useNavigation(); 
  const [genero, setGenero] = useState('');
  const [tabelaSelecionada, setTabelaSelecionada] = useState([]);
  const [peso,setPeso] = useState('');
  const [id,setId] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [resultado,setResultado] = useState('');
  const [legenda, setLegenda] = useState('');
  const [BgColor, setBgColor] = useState('rgb(254, 255, 214)');
  const [color, setColor] = useState('');

  useEffect(() => {
  const carregarDadosUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('usuario');
      console.log("Dados recuperados:", jsonValue);

      if (jsonValue != null) {
        const usuario = JSON.parse(jsonValue);
        setPeso(String(usuario.peso));
        setAltura(String(usuario.altura));
        setGenero(usuario.genero === 'Masculino' ? 'h' : 'm');

        // Calcular idade com base na data de nascimento
        const nascimento = new Date(usuario.dataNasc);
        const hoje = new Date();
        let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
          idadeCalculada--;
        }
        setIdade(String(idadeCalculada));
      }
    } catch (e) {
      console.error('Erro ao carregar dados do usuário:', e);
    }
  };

  carregarDadosUsuario();
}, []);

useEffect(() => {
  CalcularIMC();
}, [peso, altura, genero, idade]);


  const getIdade = () => {
    if (idade <= 12) return "crianca"; 
    if (idade <= 17) return "adolescente"; 
    if (idade < 60) return "adulto"; 
    if (idade > 60) return "idoso";
    return null;
  }
  
  const getColorByLegenda = (legenda) => {
    if (legenda == "Abaixo do peso") return '#ffd747';
    if (legenda == "Peso normal") return '#86fc7d';
    if (legenda == "Sobrepeso") return '#ffaa3d';
    return '#fca7a7'
  }

  const CalcularIMC = () => {
  if(genero && peso && idade && altura){
    let faixa = getIdade();
    let g = genero === 'h' ? "homens" : "mulheres";

    let imc = parseFloat(peso.replace(',', '.')) / (parseFloat(altura.replace(',', '.')) ** 2);
    const imcUsuario = imc.toFixed(2);

    const dados = imcData[faixa][g];
    setTabelaSelecionada(dados);

    const categoriaEncontrada = dados.find(({ imc }) => {
      const valores = imc.split(' – ').map(valor => parseFloat(valor.replace(/[<>]/g, '').trim()));
      const min = valores[0];
      const max = valores.length > 1 ? valores[1] : undefined;

      if (imc.includes('<')) return imcUsuario < min;
      if (imc.includes('>')) return imcUsuario > min;
      return imcUsuario >= min && (max === undefined || imcUsuario <= max);
    });

    if (categoriaEncontrada) {
      setLegenda(categoriaEncontrada.categoria);
      setColor(getColorByLegenda(categoriaEncontrada.categoria));
      setId(categoriaEncontrada.id);
      setResultado(imcUsuario);
    }
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <Feather style={styles.seta} name='arrow-left-circle' color={'#000'} size={28} />
        </Pressable>
        <Text style={styles.Titulo}> IMC </Text>
      </View>

        <View style={styles.inputs}>
          <View style={styles.content}>
            <Text style={styles.legenda}> Seu Peso: </Text>
              <TextInput
  style={styles.textInput}
  placeholder="Peso (kg)"
  keyboardType="numeric"
  placeholderTextColor={'#4f5951'}
  value={peso}
  editable={false}
/>
            </View>
            <View style={styles.content}>
                <Text style={styles.legenda}> Sua Altura: </Text>
                <TextInput
  style={styles.textInput}
  placeholder="Altura (m)"
  keyboardType='numeric'
  placeholderTextColor={'#4f5951'}
  value={altura}
  editable={false}
/>
              </View>
        </View>
        <View style={styles.inputs}>
          <View style={styles.content}>
            <Text style={styles.legenda}> Genero: </Text>
              <Picker
  selectedValue={genero}
  onValueChange={(itemValue) => setGenero(itemValue)}
  style={styles.textInput}
  enabled={false} // desabilita o Picker
>
  <Picker.Item label="Escolha" disabled value="" />
  <Picker.Item label="Homem" value="h" />
  <Picker.Item label="Mulher" value="m" />
</Picker>
            </View>
            <View style={styles.content}>
                <Text style={styles.legenda}> Idade: </Text>
                <TextInput
  style={styles.textInput}
  placeholder="Ex.: 18"
  keyboardType='numeric'
  placeholderTextColor={'#4f5951'}
  value={idade}
  editable={false}
/>
              </View>
        </View>

    <View style={styles.imagem}>
      <Image style={{width: 200, height: 200}}
        source={require('../../../assets/img/corpoOk.png')}/>
    </View>

        {resultado !== '' && (
  <>
    <View style={styles.textResult}>
      <Text style={styles.resultado}>{resultado}</Text>
      <Text style={[styles.diagnostico, { color: color }]}>
        {legenda}
      </Text>
    </View>
  </>
)}

          <View style={styles.tabelaContainer}>
  
            <View style={styles.tabelaHeader}>
              <Text style={styles.tabelaHeaderText}>Categoria</Text>
              <Text style={styles.tabelaHeaderText}>IMC</Text>
            </View>

    
              <FlatList
              data={tabelaSelecionada}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                let corFundo = '#fff'; 

                if(item.id == id){
                  corFundo = 'red';
                }

                return (
                  <View style={[styles.tabelaLinha, { backgroundColor: corFundo }]}>
                    <Text style={styles.tabelaTexto}>{item.categoria}</Text>
                    <Text style={styles.tabelaTexto}>{item.imc}</Text>
                  </View>
                );
              }}
            />
          </View>
   
{/*           <Button
            title="Calcular"
            color="#ffd500"
           onPress={CalcularIMC}
        /> */}
        
      <StatusBar style="auto" />
    
    </View>
  );
};

