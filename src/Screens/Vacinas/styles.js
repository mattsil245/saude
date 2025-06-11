import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(245, 196, 168)',
      },
      listContainer: {
        paddingHorizontal: 10,
        marginTop: 20
      },
      card: {
        height: 140,
        width: 140,
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: 'rgb(255, 123, 0)',
      },
      cardSelecionado: {
        backgroundColor: 'rgb(255, 212, 70)', // Vermelho mais escuro para o selecionado
      },
      image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
      },
      text: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
      },
      vacinaContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: 'rgb(253, 100, 11)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
      titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: 'rgb(253, 100, 11)'
      },
      vacinaItem: {
        marginBottom: 10,
      },
      idade: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      vacina: {
        fontSize: 14,
        color: 'rgb(0, 255, 21)',
      },
      nav: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        color: 'rgb(253, 100, 11)',
        backgroundColor: 'rgb(245, 196, 168)',
/*         borderBottomWidth: 1.5,
        borderBottomColor: 'black' */
      },
      home: {
        marginRight: 10
      },
      seta: {
        marginLeft: 5,
        color: 'rgb(253, 100, 11)',
        fontWeight: 'bold'
      },
      Titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'rgb(253, 100, 11)'
      },
      vacinaCard: {
        backgroundColor: 'rgb(255, 234, 196)',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        flex: 1
      },
      vacinaIdade: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(255, 94, 0)',
        marginBottom: 5,
      },
      vacinaLista: {
        paddingLeft: 10,
      },
      vacinaNome: {
        fontSize: 16,
        color: 'rgb(71, 49, 7)',
        marginTop: 2,
      },
});
