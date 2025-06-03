import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import styles from './styles';

export default function Diabetes() {
  return (
    <View style={styles.container}>
      <Text>Diabetes</Text>
      <StatusBar style="auto" />
    </View>
  );
}


