import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9fff0',
    },
    row: {
            flexDirection: 'row',
            flexWrap: 'wrap', // Garante que, se necessário, os itens irão quebrar para a próxima linha
            justifyContent: 'space-around',  // Distribui os itens uniformemente
            marginBottom: 10, // Para dar espaço entre as linha          
    },
    box:{
        flex: 1,
        height: '145px',
        width: '145px',
        padding: 5,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    icone:{
        height: 110,
        width: 110,
    },
    nav: {
        position: 'static',
        width: '100%',
        height: 40,
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: 15,
        flexDirection: 'row',
        display: 'flex',
    },
    Titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        marginEnd: 3,
        color: '#094d32',
    },
    iconeText: {
        fontWeight: 'bold',
        color: '#1b1a3d',
        fontSize: 14,  
        marginTop: 3,
    },
    scrollView: {
        flex: 1,
        paddingBottom: 20, // opcional, para dar um espaço ao final
        
      },
    perfil: {
        borderColor: '#9c9c9c',
        borderWidth: 2,
        borderRadius: 80,
        width: 50,
        height: 50,
        marginEnd: 20,
  },
  dropdownMenu: {
  position: 'absolute',
  top: 60, // ajuste conforme sua nav
  right: 10,
  width: 150,
  backgroundColor: 'white',
  borderRadius: 5,
  paddingVertical: 10,
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowRadius: 5,
  shadowOffset: { width: 0, height: 2 },
  zIndex: 10,
},

dropdownItem: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderBottomColor: '#ddd',
  borderBottomWidth: 1,
},


      
})