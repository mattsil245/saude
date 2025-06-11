import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Routes/AuthContext';

export default function Home() {
    const navigation = useNavigation();
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const { logout } = useContext(AuthContext); // aqui

  return (
    <View style={styles.container}>
         

        <View style={styles.nav}>
        <Text style={styles.Titulo}> Cuide-se Bem! </Text>
        <Pressable onPress={() => setDropdownAberto(!dropdownAberto)}>
          <Image
            style={styles.perfil}
            source={require('../../../assets/img/fotoPerfil.jpeg')}
          />
        </Pressable>
      </View>

      {dropdownAberto && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setDropdownAberto(false);
              navigation.navigate('EditarPerfil'); // Navega para a tela de alterar dados
            }}
          >
            <Text>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setDropdownAberto(false);
              logout(); // logout correto aqui
            }}
          >
            <Text>Sair</Text>
          </TouchableOpacity>

        </View>
      )}
        <ScrollView style={styles.scrollView}>

        <View style={styles.row}>

            <View style={[styles.box, { backgroundColor: 'rgb(100, 213, 217)'}]}>
            <Pressable onPress={() => navigation.navigate('Agua')} style={styles.agua}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/beberAgua.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Hidrate-se!</Text>
            </View>

            <View style={[styles.box, { backgroundColor: 'rgb(93, 93, 187)'}]}>
            <Pressable onPress={() => navigation.navigate('Dormir')} style={styles.dormir}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/dormir.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Sono Relaxante</Text>
            </View>
            
        </View>

        <View style={styles.row}>

            <View style={[styles.box, { backgroundColor: 'rgb(216, 81, 81)'}]}>
            <Pressable onPress={() => navigation.navigate('Frases')} style={styles.frase}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/10.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Tenha Motivação</Text>
            </View>

            <View style={[styles.box, { backgroundColor: 'rgb(247, 190, 92)'}]}>
            <Pressable onPress={() => navigation.navigate('Vacinas')} style={styles.vacina}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/vacina.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Vacina em Dia</Text>
            </View>
            
        </View>

        <View style={styles.row}>

            <View style={[styles.box, { backgroundColor: 'rgb(237, 255, 77)'}]}>
            <Pressable onPress={() => navigation.navigate('Imc')} style={styles.imc}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/imc.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Cuide do Corpo!</Text>
            </View>

            <View style={[styles.box, { backgroundColor: 'rgb(172, 255, 77)'}]}>
            <Pressable onPress={() => navigation.navigate('Frutas')} style={styles.frutas}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/fruta.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>A fruta Ideal</Text>
            </View>
            
        </View>

        <View style={styles.row}>

            <View style={[styles.box, { backgroundColor: 'rgb(163, 75, 171)'}]}>
            <Pressable onPress={() => navigation.navigate('Diabetes')} style={styles.diabete}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/diabete.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Controle a Diabetes</Text>
            </View>

            <View style={[styles.box, { backgroundColor: 'rgb(75, 171, 149)'}]}>
            <Pressable onPress={() => navigation.navigate('Pressao')} style={styles.pressao}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/pressao.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Pressão Equilibrada</Text>
            </View>
            
        </View>

        <View style={styles.row}>

            <View style={[styles.box, { backgroundColor: 'rgb(255, 220, 106)'}]}>
            <Pressable onPress={() => navigation.navigate('Remedio')} style={styles.remedio}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/remedio.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Lembre dos Remedios</Text>
            </View>

            <View style={[styles.box, { backgroundColor: 'rgb(255, 120, 160)'}]}>
            <Pressable onPress={() => navigation.navigate('Meditacao')} style={styles.meditacao}>
            <Image
        style={styles.icone}
        source={require('../../../assets/img/meditacao.png')}/>
            </Pressable>
            <Text style={styles.iconeText}>Relaxe!</Text>
            </View>
            
        </View>


      <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}


