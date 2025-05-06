import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function DetalhesOrcamentoScreen({ route, navigation }) {
  const { orcamento } = route.params || {};

  if (!orcamento) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>Erro ao carregar o orçamento.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <Text style={styles.label}>Cliente:</Text>
      <Text style={styles.valor}>{orcamento.nome}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.valor}>{orcamento.telefone}</Text>

      <Text style={styles.label}>Produto:</Text>
      <Text style={styles.valor}>{orcamento.produto}</Text>

      <Text style={styles.label}>Modelo:</Text>
      <Text style={styles.valor}>{orcamento.modelo}</Text>

      <Text style={styles.label}>Problema:</Text>
      <Text style={styles.valor}>{orcamento.problema}</Text>

      <Text style={styles.label}>Valor Estimado:</Text>
      <Text style={styles.valor}>{orcamento.valor}</Text>

      <Text style={styles.label}>Previsão de Entrega:</Text>
      <Text style={styles.valor}>{orcamento.dataEntrega}</Text>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() => navigation.navigate('CadastroOrcamento', { orcamento })}
      >
        <Text style={styles.textoBotao}>Editar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#555'
  },
  valor: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000'
  },
  botaoEditar: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  erro: {
    marginTop: 50,
    fontSize: 18,
    textAlign: 'center',
    color: 'red'
  }
});