import { StyleSheet } from 'react-native';
import { MD2Colors, MD3Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9fff0',
    paddingTop: 10,
  },

  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

Titulo: {
  fontSize: 32,
  fontWeight: '700',
  color: 'rgb(46, 125, 108)',
  marginBottom: 20,
  marginTop: 10,
  textAlign: 'center',
},
  subTitulo: {
    fontSize: 20,
    color: '#333',
  },
  fotoUsuario:{
    justifyContent:'center',
    alignItems: 'center',
    width: '100%',
  },
  perfil:{
    borderColor: '#9c9c9c',
    borderWidth: 2,
    borderRadius: 80,
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  formulario:{
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
  },

  linha:{
    justifyContent:'space-between',
    display:'flex',
    width: '80%',
    flexDirection:'row',
  },

  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },

  inputMetade:{
    width: '45%',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },

  button:{
    fontWeight: '600',
  },

  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    width: '80%',
    borderRadius: 4,
    overflow: 'hidden',
  },

  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    marginTop: 10,
  },
});

export default styles;
