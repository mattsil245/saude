import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6faff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  seta: {
    marginRight: 10,
  },

  Titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007777',
  },

  subTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007777',
    marginBottom: 10,
    textAlign: 'center',
  },

  quantidade: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
  },

  textQuantidade: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007777',
  },

  copos: {
    backgroundColor: '#ccf2f2',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: '#00bfbf',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

modalView: {
  backgroundColor: '#f0fefe',
  padding: 30,
  borderRadius: 20,
  width: '85%',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
},

modalText: {
  fontSize: 18,
  marginBottom: 15,
  color: '#007777',
  textAlign: 'center',
  fontWeight: 'bold',
},

input: {
  width: '100%',
  borderWidth: 1,
  borderColor: '#00bfbf',
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
  backgroundColor: '#fff',
},

modalButton: {
  flex: 1,
  backgroundColor: '#00bfbf',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginRight: 8, // só no primeiro botão
  alignItems: 'center',
},

modalButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 10,
},

cancelButton: {
  backgroundColor: '#999',
  marginRight: 0,
}
});
