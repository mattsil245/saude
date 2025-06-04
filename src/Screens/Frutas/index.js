import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, FlatList, Image, Pressable} from 'react-native';
import styles from './styles';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';


export default function Frutas() {
  
  const [query, setQuery] = useState('');
  const [dados, setDados] =  useState([]);
  const baseUrl = 'https://trackapi.nutritionix.com/v2/search/instant';

  const API_ID = '7652db7f';
  const API_KEY = '278ddd7adc3b689b327b8af1818b251a';

  const fetchNutri = async () => {
  try {
    const url = `${baseUrl}/?query=${query}`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': API_ID,
        'x-app-key': API_KEY
        },
        });
        setDados(response.data.branded);
        console.log(response.data.branded);
        
        } catch (error) {
          console.error("Error fetching data:", error);
          setDados([]); 
          }
    };

  useEffect(() => {
    console.log(dados);

  },[dados]);

  return (
    <View style={styles.container}>
     <View style={styles.nav}>
     <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
      <Feather style={styles.seta} name='arrow-left-circle' color={'#000'} size={30}/>
     </Pressable>
               <Text style= {styles.Titulo}> Frutas </Text>
      </View>
    
    <View style={{flexDirection: 'row', marginTop:50,}}>
      <TextInput
        style={styles.textInput}
          editable
          multiline
          maxLength={40}
          placeholder='Qual fruta quer ver hoje?'
          placeholderTextColor={'#4f5951'}
          onChangeText={setQuery}
          value={query}
        />
        <Pressable style={styles.lupa} onPress={fetchNutri}>
            <Feather name="search" size={24} color="white" />
        </Pressable>
       </View>

       <FlatList
          data={dados}
          keyExtractor={(item,index) => index}
          renderItem={({ item }) => (
            <View style={[styles.lista,{flexDirection:'row',alignItems:'center',}]}>
               <Image
                source={{uri: item.photo.thumb,}}
                style={{width:100, height:100,marginRight: 5,}}
                />
            <View style= {{flexDirection: 'column',width: 200,flexShrink: 1 }}>
              <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: 5,}}>{item.brand_name}</Text>
              <Text>{item.food_name}</Text>
              <Text style={{ fontWeight: 'bold', color: 'red' }}>
                Calorias: {item.nf_calories} kcal
              </Text>
              </View>
            </View>
          )}
        />
      <StatusBar style="auto" />
    </View>
  );
}
