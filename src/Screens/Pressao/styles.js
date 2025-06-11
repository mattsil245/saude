import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(161, 218, 213)',
    padding: 15,
  },

  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },

  Titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'rgb(35, 116, 116)',
  },

  subTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(35, 116, 116)',
    marginVertical: 10,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  digito: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 5,
  },

  cardData: {
    fontSize: 14,
    color: '#777',
  },

  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalView: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  modalText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },

  input: {
    height: 40,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },

  button: {
    flex: 1,
    backgroundColor: 'rgb(51, 158, 126)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#999',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'rgb(47, 153, 144)',
    borderRadius: 30,
    padding: 10,
    elevation: 6,
  },
});
