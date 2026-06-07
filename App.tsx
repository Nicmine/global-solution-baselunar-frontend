import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusScreen } from './src/screens/StatusScreen';
import { CadastroScreen } from './src/screens/CadastroScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#0077b6',
          tabBarInactiveTintColor: '#718096',
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', paddingBottom: 10 },
          tabBarStyle: { height: 60 }
        }}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={StatusScreen} 
          options={{ title: '📊 Status' }}
        />
        <Tab.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: '➕ Cadastrar' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}