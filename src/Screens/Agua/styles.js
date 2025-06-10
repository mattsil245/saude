import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(110, 255, 248)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
    },
    seta: {
        marginLeft: 5
    },
    Titulo: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subTitulo: {
        fontWeight: "bold",
        color: 'rgb(0, 100, 95)',
        fontSize: 20,
        margin: 10,
    },
    quantidade: {
        borderWidth: 2,         // largura da borda (em pixels)
        borderColor: 'blue',    // cor da borda
        padding: 10,            // espaço interno
        margin: 10,             // espaço externo
        borderRadius: 8,
    },
    textQuantidade: {
        fontSize: 15,
        color: 'rgb(0, 100, 95)',
        fontWeight: 'bold',
        backgroundColor: '#fff',
    },

})