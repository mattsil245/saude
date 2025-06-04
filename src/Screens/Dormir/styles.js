import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
      },
      
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 50, 0.6)', // azul bem escuro translúcido
      },
      
      container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        justifyContent: 'flex-start',
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
      },
      
      scrollContent: {
        paddingBottom: 20,
      },
      
      dicaCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // branco transparente
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      
      dicaTexto: {
        fontSize: 16,
        color: '#e0e6f3', // branco suave
        lineHeight: 24,
      },
      background: {
        flex: 1,
        justifyContent: 'center',
      },
      
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 50, 0.6)', // azul bem escuro translúcido
      },
      
      container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        justifyContent: 'flex-start',
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
      },
      
      scrollContent: {
        paddingBottom: 20,
      },
      
      dicaCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      
      dicaTexto: {
        fontSize: 22,
        color: '#e0e6f3',
        lineHeight: 28,
      }      
})