import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(204, 152, 218)',
        padding: 10,
        justifyContent: 'flex-start'
    },

    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    seta: {
        marginLeft: 5
    },
    Titulo: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    SubTitulo: {
        fontWeight: "400",
        fontSize: 20,
        margin: 10,

    },
    sub: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    modalText:{
        marginBottom: 10,
        fontSize: 15,
    },
    btn: {
        width: 20
    },
    input: {
        padding: 5,
        borderColor: 'gray',
    }
})