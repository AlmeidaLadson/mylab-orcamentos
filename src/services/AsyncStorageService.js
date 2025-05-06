import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarOrcamento = async (orcamento) => {
  try {
    const dadosExistentes = await AsyncStorage.getItem('orcamentos');
    const orcamentos = dadosExistentes ? JSON.parse(dadosExistentes) : [];
    orcamentos.push(orcamento);
    await AsyncStorage.setItem('orcamentos', JSON.stringify(orcamentos));
  } catch (error) {
    console.error('Erro ao salvar orçamento:', error);
  }
};

export const listarOrcamentos = async () => {
  try {
    const dados = await AsyncStorage.getItem('orcamentos');
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error('Erro ao listar orçamentos:', error);
    return [];
  }
};

export const atualizarOrcamento = async (orcamentoAtualizado) => {
  try {
    const dados = await AsyncStorage.getItem('orcamentos');
    let orcamentos = dados ? JSON.parse(dados) : [];

    orcamentos = orcamentos.map((item) =>
      item.id === orcamentoAtualizado.id ? orcamentoAtualizado : item
    );

    await AsyncStorage.setItem('orcamentos', JSON.stringify(orcamentos));
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
  }
};