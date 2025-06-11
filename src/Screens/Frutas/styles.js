import { StyleSheet } from "react-native";
import { TextInput } from "react-native-web";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(201, 255, 214)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lista: {
        flex: 1,
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

      },
    textInput: {
        fontSize: 18,
        alignItems: 'center',
        borderWidth: 2,   // Agora a borda aparece corretamente
        borderColor: '#888', 
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10,
        height: 45,
        width: 250,
        marginBottom: 10,
        justifyContent: 'center',
        fontWeight: 'bold',

           
    },
    nav: {
        position: 'static',
        width: '100%',
        height: 40,
/*         borderBottomWidth: 1, */
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
        flexDirection: 'row',
        marginTop: 25,
    },
    Titulo: {
        fontWeight: 'bold',
        fontSize: 22,
        marginEnd: 3,
        color: 'rgb(30, 70, 40)',
    },
    seta: {
        marginLeft: 10,
        color: 'rgb(30, 70, 40)',
    },
    lupa: {
        color: 'white', 
        backgroundColor:'rgb(53, 97, 64)',
        size: 25,
        marginLeft: 15, 
        padding: 10,
        borderRadius: 10, 
        height: 48,
        width: 48,   
    },
    
})