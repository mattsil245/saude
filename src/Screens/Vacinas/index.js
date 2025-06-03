import React, {useState} from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


const categorias = [
  { id: 1, nome: 'Criança', image: require('../../../assets/img/crianca.png'), cod: 'crianca'}, 
  { id: 2, nome: 'Adolescente', image: require('../../../assets/img/adolescente.png'), cod: 'adolescente'},
  { id: 3, nome: 'Adulto', image: require('../../../assets/img/adulto.png'), cod: 'adulto'},
  { id: 4, nome: 'Idoso', image: require('../../../assets/img/idoso.png'), cod: 'idoso'},
  { id: 5, nome: 'Gestante', image: require('../../../assets/img/gestante.png'), cod: 'gestante'}
];

const vacinacao = {
  crianca: [
    { idade: 'Ao nascer', vacinas: ['BCG (contra tuberculose)', 'Hepatite B (dose única)'] },
    { idade: '2 meses', vacinas: ['Penta (DTP+Hib+Hep B)', 'VIP (Poliomielite inativada)', 'Pneumocócica 10-valente', 'Rotavírus humano'] },
    { idade: '3 meses', vacinas: ['Meningocócica C'] },
    { idade: '4 meses', vacinas: ['Penta (DTP+Hib+Hep B)', 'VIP (Poliomielite inativada)', 'Pneumocócica 10-valente', 'Rotavírus humano'] },
    { idade: '5 meses', vacinas: ['Meningocócica C'] },
    { idade: '6 meses', vacinas: ['Penta (DTP+Hib+Hep B)', 'VIP (Poliomielite inativada)'] },
    { idade: '9 meses', vacinas: ['Febre amarela'] },
    { idade: '12 meses', vacinas: ['Tríplice Viral (Sarampo, Caxumba, Rubéola)', 'Pneumocócica 10-valente (reforço)', 'Meningocócica C (reforço)'] },
    { idade: '15 meses', vacinas: ['DTP (Difteria, Tétano, Coqueluche)', 'VOP (Poliomielite oral - reforço)', 'Hepatite A', 'Tetra Viral (Tríplice viral + Varicela)'] },
    { idade: '4 anos', vacinas: ['DTP (Difteria, Tétano, Coqueluche)', 'VOP (Poliomielite oral - reforço)', 'Varicela (se não tomou a tetra viral)'] },
  ],
  gestante: [
    { idade: 'Qualquer idade gestacional', vacinas: ['Hepatite B', 'Influenza (Gripe)'] },
    { idade: 'A partir da 20ª semana', vacinas: ['dTpa (Difteria, Tétano e Coqueluche)'] },
  ],
  adolescente: [
    { idade: '11 a 14 anos', vacinas: ['HPV (Papilomavírus Humano)'] },
    { idade: '11 a 19 anos', vacinas: ['Tríplice Viral (Sarampo, Caxumba, Rubéola) - se não vacinado', 'Febre Amarela - se não vacinado'] },
    { idade: 'A partir dos 12 anos', vacinas: ['Meningocócica ACWY'] },
    { idade: 'A cada 10 anos', vacinas: ['dT (Difteria e Tétano)'] },
  ],
  adulto: [
    { idade: 'A cada 10 anos', vacinas: ['dT (Difteria e Tétano)'] },
    { idade: 'Se não tomou na infância', vacinas: ['Hepatite B', 'Febre Amarela', 'Tríplice Viral (Sarampo, Caxumba, Rubéola)'] },
    { idade: 'Durante surtos ou recomendações', vacinas: ['Meningocócica ACWY'] },
  ],
  idoso: [
    { idade: 'A partir dos 60 anos', vacinas: ['Influenza (Gripe) - dose anual', 'Pneumocócica 23-valente'] },
    { idade: 'Se não tomou na idade adulta', vacinas: ['Hepatite B', 'dT (Difteria e Tétano)', 'Febre Amarela (se morar em área de risco)'] },
  ],
};


export default function Vacinas() {
  
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const navigation = useNavigation(); // Para navegar entre telas

  function chamar(cod) {
    setCategoriaSelecionada(cod);
  }

  return (    
    <View style={styles.container}>

      <View style={styles.nav}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <Feather style={styles.seta} name='arrow-left-circle' color={'#000'} size={28} />
        </Pressable>
        <Text style={styles.Titulo}> Vacinas </Text>
      </View>

      <FlatList
        data={categorias}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true} // Permite rolagem dentro de um ScrollView
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, categoriaSelecionada === item.cod && styles.cardSelecionado]} onPress={() => chamar(item.cod)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      {categoriaSelecionada && (
        <ScrollView style={styles.vacinaContainer} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.titulo}>{categorias.find(c => c.cod === categoriaSelecionada)?.nome}</Text>

          <View style={{ maxHeight: 400 }}> {/* Ajusta altura máxima para evitar sobreposição */}
            <FlatList
              data={vacinacao[categoriaSelecionada]}
              nestedScrollEnabled={true} 
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.vacinaCard}>
                  <Text style={styles.vacinaIdade}>{item.idade}</Text>
                  <View style={styles.vacinaLista}>
                    {item.vacinas.map((vacina, index) => (
                      <Text key={index} style={styles.vacinaNome}>{`• ${vacina}`}</Text>
                    ))}
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
