import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import styles from './styles';

export default function Dormir() {
  return (
    <View style={styles.container}>
      <Text>Dormir</Text>
      <StatusBar style="auto" />
    </View>
  );
}


