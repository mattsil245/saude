import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

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
import Login from '../Screens/Login';   
import Start from '../Screens/Start';  
import ConfigIP from '../Screens/ConfigIP';
import EditarPerfil from '../Screens/EditarPerfil';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificarUsuario();
  }, []);

  const verificarUsuario = async () => {
    try {
      const user = await AsyncStorage.getItem('usuario');
      setUsuario(user ? JSON.parse(user) : null);
    } catch (e) {
      console.log('Erro ao verificar usuário:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Imc" component={Imc} />
            <Stack.Screen name="Agua" component={Agua} />
            <Stack.Screen name="Diabetes" component={Diabetes} />
            <Stack.Screen name="Dormir" component={Dormir} />
            <Stack.Screen name="Frases" component={Frases} />
            <Stack.Screen name="Frutas" component={Frutas} />
            <Stack.Screen name="Meditacao" component={Meditacao} />
            <Stack.Screen name="Pressao" component={Pressao} />
            <Stack.Screen name="Remedio" component={Remedio} />
            <Stack.Screen name="Vacinas" component={Vacinas} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          </>
        ) : (
          <>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="ConfigIP" component={ConfigIP} />
            <Stack.Screen name="Login">
              {props => <Login {...props} setUsuario={setUsuario} />}
            </Stack.Screen>
            <Stack.Screen name="Cadastro">
              {props => <Cadastro {...props} setUsuario={setUsuario} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
