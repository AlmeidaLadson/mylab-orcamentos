import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Floripa</Text>
        <Text style={styles.subtitle}>Especializada em Produtos Apple</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroOrcamento')}
        >
          <Text style={styles.buttonText}>Cadastrar Orçamento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ListaOrcamentos')}
        >
          <Text style={styles.buttonText}>Ver Orçamentos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 10,
    marginTop: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});