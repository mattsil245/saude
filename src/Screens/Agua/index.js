import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import styles from './styles';

export default function Agua() {
  return (
    <View style={styles.container}>
      <Text>Agua</Text>
      <StatusBar style="auto" />
    </View>
  );
}


