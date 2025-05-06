import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listarOrcamentos } from '../services/AsyncStorageService';

export default function ListaOrcamentosScreen({ navigation }) {
  const [orcamentos, setOrcamentos] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const carregarOrcamentos = async () => {
      const dados = await listarOrcamentos();
      setOrcamentos(dados);

      const soma = dados.reduce((total, item) => {
        const numero = parseFloat(item.valor.replace(/[R$\.\s]/g, '').replace(',', '.'));
        return total + (isNaN(numero) ? 0 : numero);
      }, 0);

      setValorTotal(soma);
    };

    const unsubscribe = navigation.addListener('focus', carregarOrcamentos);
    return unsubscribe;
  }, [navigation]);

  const excluirOrcamento = async (id) => {
    const atualizados = orcamentos.filter((item) => item.id !== id);
    setOrcamentos(atualizados);
    await AsyncStorage.setItem('orcamentos', JSON.stringify(atualizados));

    const novaSoma = atualizados.reduce((total, item) => {
      const numero = parseFloat(item.valor.replace(/[R$\.\s]/g, '').replace(',', '.'));
      return total + (isNaN(numero) ? 0 : numero);
    }, 0);

    setValorTotal(novaSoma);
  };

  const confirmarExclusao = (id) => {
    Alert.alert('Excluir Orçamento', 'Deseja realmente excluir este orçamento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => excluirOrcamento(id) }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalhesOrcamento', { orcamento: item })}
    >
      <View style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.info}>{item.produto} - {item.modelo}</Text>
          <Text style={styles.info}>Entrega: {item.dataEntrega}</Text>
          <Text style={styles.valor}>R$ {item.valor}</Text>
        </View>
        <TouchableOpacity
          style={[styles.botaoAcao, styles.botaoExcluir]}
          onPress={() => confirmarExclusao(item.id)}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.total}>
        Valor total: <Text style={styles.totalValor}>R$ {valorTotal.toFixed(2).replace('.', ',')}</Text>
      </Text>

      <FlatList
        data={orcamentos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444'
  },
  totalValor: {
    fontWeight: 'bold',
    color: '#007AFF'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  info: {
    fontSize: 14,
    color: '#555'
  },
  valor: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  botoes: {
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  botaoAcao: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4
  },
  botaoEditar: {
    backgroundColor: '#007AFF'
  },
  botaoExcluir: {
    backgroundColor: '#FF3B30'
  },
  textoBotao: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }
});