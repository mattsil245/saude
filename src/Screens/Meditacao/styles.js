import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  backButton: {
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  audioList: {
    paddingBottom: 120,
  },

  audioCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  audioNome: {
    fontSize: 18,
    color: '#FFF',
    flex: 1,
  },

  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  progressText: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5,
  },

  progressBar: {
    width: '100%',
    height: 30,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
