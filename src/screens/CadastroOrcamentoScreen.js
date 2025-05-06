import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { salvarOrcamento, atualizarOrcamento } from '../services/AsyncStorageService';

export default function CadastroOrcamentoScreen({ route, navigation }) {
  const orcamentoEditavel = route.params?.orcamento;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [produto, setProduto] = useState('');
  const [modelo, setModelo] = useState('');
  const [problema, setProblema] = useState('');
  const [valor, setValor] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');

  useEffect(() => {
    if (orcamentoEditavel) {
      setId(orcamentoEditavel.id || '');
      setNome(orcamentoEditavel.nome || '');
      setTelefone(orcamentoEditavel.telefone || '');
      setProduto(orcamentoEditavel.produto || '');
      setModelo(orcamentoEditavel.modelo || '');
      setProblema(orcamentoEditavel.problema || '');
      setValor(orcamentoEditavel.valor || '');
      setDataEntrega(orcamentoEditavel.dataEntrega || '');
    }
  }, []);

  const limparCampos = () => {
    setId('');
    setNome('');
    setTelefone('');
    setProduto('');
    setModelo('');
    setProblema('');
    setValor('');
    setDataEntrega('');
  };

  const salvarOuAtualizar = async () => {
    const nomeValido = nome?.trim();
    const telefoneValido = telefone?.replace(/\D/g, '');
    const produtoValido = produto?.trim();
    const modeloValido = modelo?.trim();
    const problemaValido = problema?.trim();
    const valorValido = valor?.replace(/[^0-9]/g, '');
    const dataValida = dataEntrega?.replace(/\D/g, '');

    const camposPreenchidos =
      nomeValido &&
      telefoneValido?.length === 11 &&
      produtoValido &&
      modeloValido &&
      problemaValido &&
      valorValido?.length >= 2 &&
      dataValida?.length === 8;

    if (!camposPreenchidos) {
      Alert.alert('Preencha todos os campos corretamente!');
      return;
    }

    const orcamento = {
      id: id || Date.now(),
      nome,
      telefone,
      produto,
      modelo,
      problema,
      valor,
      dataEntrega
    };

    if (id) {
      await atualizarOrcamento(orcamento);
    } else {
      await salvarOrcamento(orcamento);
    }

    limparCampos();
    navigation.navigate('ListaOrcamentos');
  };

  const confirmarEdicao = () => {
    Alert.alert(
      'Confirmar Edição',
      'Deseja realmente atualizar este orçamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => salvarOuAtualizar() }
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>{id ? 'Editar Orçamento' : 'Novo Orçamento'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          value={nome}
          maxLength={40}
          onChangeText={setNome}
        />

        <MaskedTextInput
          style={styles.input}
          mask="(99) 99999-9999"
          placeholder="Telefone (com DDD)"
          keyboardType="numeric"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TextInput
          style={styles.input}
          placeholder="Produto"
          value={produto}
          onChangeText={setProduto}
        />

        <TextInput
          style={styles.input}
          placeholder="Modelo ou Versão"
          value={modelo}
          onChangeText={setModelo}
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Descreva o problema"
          value={problema}
          onChangeText={setProblema}
          multiline
          maxLength={200}
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={`R$ ${valor}`}
          onChangeText={(text) => {
            // Impede apagar o R$ (mantém apenas o conteúdo após ele)
            const onlyValue = text.replace(/^R\\$\\s*/, '').replace(/[^0-9,]/g, '');
            setValor(onlyValue);
          }}
          placeholder="R$ 0,00"
        />

        <MaskedTextInput
          style={styles.input}
          placeholder="Previsão de Entrega"
          mask="99/99/9999"
          keyboardType="numeric"
          value={dataEntrega}
          onChangeText={setDataEntrega}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={id ? confirmarEdicao : salvarOuAtualizar}
        >
          <Text style={styles.textoBotao}>{id ? 'Atualizar Orçamento' : 'Salvar Orçamento'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar Campos</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  botaoLimpar: {
    backgroundColor: '#999'
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});