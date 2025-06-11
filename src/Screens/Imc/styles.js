import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(254, 255, 214)',
        padding: 10,
        justifyContent: 'flex-start'
    },
    box: {
        width: 60,
        height: 55,
        backgroundColor: 'red',
        marginTop: 20,
        marginLeft: 20,
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
      },
      home: {
        marginRight: 10
      },
      seta: {
        marginLeft: 5
      },
      Titulo: {
        fontSize: 20,
        fontWeight: 'bold'
      },
    textInput: {
        fontSize: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#888',
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10,
        height: 45,
        width: 120,
        margin: 10,
        justifyContent: 'space-around',
        fontWeight: 'bold',
    },
    legenda: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
        textAlign: 'center',
    },
    resultado: {
        color: 'black',
        fontSize: 30,
        marginBottom: 15,
        textAlign: 'center',
    },
    diagnostico: {
        fontSize: 25,
        color: 'black',
        marginBottom: 20,
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginTop: 40, 
    },
    
    content: {
        flexDirection: 'column',
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, 
        height: 30, 
    },
    imagem:{
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textResult:{
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabelaContainer: {
        width: '80%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: '#fff',
      },
      
      tabelaHeader: {
        flexDirection: 'row',
        backgroundColor: '#ffd500',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingVertical: 8,
      },
      
      tabelaHeaderText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
      },
      
      tabelaLinha: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 6,
      },
      
      tabelaTexto: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
      },
      // Adicione ao seu arquivo styles.js
gaugeContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 20,
},
gaugeValueContainer: {
  marginTop: 10,
  padding: 8,
  backgroundColor: '#f0f0f0',
  borderRadius: 10,
},
gaugeValueText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
});
