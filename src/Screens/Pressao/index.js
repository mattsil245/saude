import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import styles from './styles';

export default function Pressao() {
  return (
    <View style={styles.container}>
      <Text>Pressao</Text>
      <StatusBar style="auto" />
    </View>
  );
}


