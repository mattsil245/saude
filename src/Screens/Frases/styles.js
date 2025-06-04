import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    home: {
        marginRight: 10,
    },
    seta: {},
        Titulo: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    fraseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frase: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        fontStyle: 'italic',
    }
})