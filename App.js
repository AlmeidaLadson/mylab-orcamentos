import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CadastroOrcamentoScreen from './src/screens/CadastroOrcamentoScreen';
import ListaOrcamentosScreen from './src/screens/ListaOrcamentosScreen';
import DetalhesOrcamentoScreen from './src/screens/DetalhesOrcamentoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'MyLab Orçamentos' }}
        />
        <Stack.Screen 
          name="CadastroOrcamento" 
          component={CadastroOrcamentoScreen} 
          options={{ title: 'Novo Orçamento' }}
        />
        <Stack.Screen 
          name="ListaOrcamentos" 
          component={ListaOrcamentosScreen} 
          options={{ title: 'Orçamentos Salvos' }}
        />
        <Stack.Screen 
          name="DetalhesOrcamento" 
          component={DetalhesOrcamentoScreen} 
          options={{ title: 'Detalhes do Orçamento' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}