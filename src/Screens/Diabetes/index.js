import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Diabetes() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <Feather style={styles.seta} name='arrow-left-circle' color={'#000'} size={28} />
        </Pressable>
        <Text style={styles.Titulo}>Diabetes</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
