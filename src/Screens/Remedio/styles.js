import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  home: {
    marginRight: 10,
  },

  Titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  subTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  digito: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  cardData: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },

  cancelButton: {
    backgroundColor: '#f44336',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  floatingButtonLeft: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: '#2196F3',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  previewImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  
});
