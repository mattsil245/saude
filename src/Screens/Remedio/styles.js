import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    app: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        backgroundColor: "rgb(234, 235, 184)",
    },

    title: {
        fontWeight: "800",
        fontSize: 25,
        margin: 10,
    },

    btn: {
        width: 250,
        margin: 10,
    },

    img: {
        width: 200,
        height: 200,
        borderRadius: 5,
    },

    input: {
        borderBottomWidth: 1,
        width: 250,
        textAlign: "center",
        margin: 10,
    },

    history: {
        marginTop: 10,
        fontSize: 25,
    },

    textItem: {
        margin: 2.5,
        fontSize: 18,
    },
});
