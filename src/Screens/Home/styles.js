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
        justifyContent:'center',
        marginTop: 15,
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
        
      }
      
})