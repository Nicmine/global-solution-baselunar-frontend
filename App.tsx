import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importamos um pacote de ícones nativo padrão do React Native
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StatusScreen } from './src/screens/StatusScreen';
import { CadastroScreen } from './src/screens/CadastroScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    // Cor do ícone e texto quando a aba estiver selecionada (Tom Lunar Destacado)
                    tabBarActiveTintColor: '#00b4d8',
                    // Cor do ícone e texto quando a aba estiver desativada
                    tabBarInactiveTintColor: '#64748b',
                    // Estilização dos textos das abas
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                        paddingBottom: 5
                    },
                    // Estilização do container da barra inferior (Fundo escuro profissional)
                    tabBarStyle: {
                        height: 65,
                        backgroundColor: '#0f172a',
                        borderTopWidth: 1,
                        borderTopColor: '#1e293b',
                        paddingTop: 5
                    },
                    // Função que renderiza os ícones dinamicamente baseado no nome da rota
                    tabBarIcon: ({ color, size }) => {
                        let iconName = '';

                        if (route.name === 'Dashboard') {
                            iconName = 'view-dashboard-outline';
                        } else if (route.name === 'Cadastro') {
                            iconName = 'plus-box-outline';
                        }

                        return <Icon name={iconName} size={size + 2} color={color} />;
                    },
                })}
            >
                <Tab.Screen
                    name="Dashboard"
                    component={StatusScreen}
                    options={{ title: 'Status' }}
                    // Esse listener garante que ao tocar na aba, o app force a atualização dos dados do Spring Boot
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            // Navega limpando o histórico para resetar o estado da tela
                            navigation.navigate('Dashboard');
                        },
                    })}
                />
                <Tab.Screen
                    name="Cadastro"
                    component={CadastroScreen}
                    options={{ title: 'Cadastrar' }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}