import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import styles from './styles';
import axios from 'axios';

export default function Meditacao() {
/* 
  const fetchUsuarios = async () => {

usuario={
  
}

    try{
      const url = "http://10.67.4.194:8000/api/usuarios";
      const response = await axios.get(url,  {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data)
    }catch(error){
      console.error("Error fetching data:", error);
    }
  }

  fetchUsuarios(); */

  return (
    <View style={styles.container}>
      <Text>Meditacao</Text>
      <StatusBar style="auto" />
    </View>
  );
}


