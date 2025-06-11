import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(204, 152, 218)',
        padding: 10,
    },

    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    seta: {
        marginLeft: 5
    },
    Titulo: {
        fontWeight: '700',
        fontSize: 24,
        fontWeight: 'bold'
    },
    SubTitulo: {
        fontWeight: "500",
        fontSize: 18,
        margin: 10,
        color: '#333',
        textAlign: 'center'
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
    padding: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    width: '80%',
    },
         modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
    btn: {
        width: 20
    },
    input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  
  button: {
    backgroundColor: '#7E57C2',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
    addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  card:{
    backgroundColor:'#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent:'center',
  },
  digito:{
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor:'#000',
    fontSize: 15,
    fontWeight:'bold',
    height:'auto',
    width:'100%',
  }
})


 

  
