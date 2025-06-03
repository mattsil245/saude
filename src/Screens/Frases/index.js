import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import styles from './styles';

export default function Frases() {
  return (
    <View style={styles.container}>
      <Text>Frases</Text>
      <StatusBar style="auto" />
    </View>
  );
}


