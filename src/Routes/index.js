import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './../Screens/Home';
import Imc from './../Screens/Imc';
import Agua from '../Screens/Agua';
import Diabetes from '../Screens/Diabetes';
import Dormir from '../Screens/Dormir';
import Frases from '../Screens/Frases';
import Frutas from '../Screens/Frutas';
import Meditacao from '../Screens/Meditacao';
import Pressao from '../Screens/Pressao';
import Remedio from '../Screens/Remedio';
import Vacinas from '../Screens/Vacinas';
import Cadastro from '../Screens/Cadastro';
const Stack = createNativeStackNavigator ();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Imc" component={Imc}/>
        <Stack.Screen name="Agua" component={Agua}/>
        <Stack.Screen name="Diabetes" component={Diabetes}/>
        <Stack.Screen name="Dormir" component={Dormir}/>
        <Stack.Screen name="Frases" component={Frases}/>
        <Stack.Screen name="Frutas" component={Frutas}/>
        <Stack.Screen name="Meditacao" component={Meditacao}/>
        <Stack.Screen name="Pressao" component={Pressao}/>
        <Stack.Screen name="Remedio" component={Remedio}/>
        <Stack.Screen name="Vacinas" component={Vacinas}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
