# MyLab Floripa - Orçamentos Mobile

Aplicativo mobile desenvolvido com React Native e Expo para controle de orçamentos em uma assistência técnica de produtos Apple, desenvolvido como projeto de extensão acadêmica.

## Funcionalidades

- Cadastro de orçamentos com validações
- Edição e exclusão de orçamentos
- Visualização de lista e detalhes
- Armazenamento local com AsyncStorage

## Tecnologias

- React Native
- Expo
- React Navigation
- AsyncStorage
- react-native-mask-text


## Instalação

git clone https://github.com/AlmeidaLadson/mylab-orcamentos
cd mylab-orcamentos
npm install
npx expo start

Use o app Expo Go para rodar no dispositivo físico.


## Estrutura

src/
├── screens/
│   ├── HomeScreen.js
│   ├── CadastroOrcamentoScreen.js
│   └── ListaOrcamentosScreen.js
├── services/
│   └── AsyncStorageService.js
assets/
App.js