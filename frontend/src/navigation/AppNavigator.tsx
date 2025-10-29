// Navegação
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import ProfileScreen from '../screens/ProfileSreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Restaurant: { restaurantId: string };
  Profile: undefined;
  Favorites: undefined;
  NotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Restaurant'
          component={RestaurantScreen}
          options={{ title: 'Detalhes do restaurante' }}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{ title: 'Meu Perfil' }}
        />
        <Stack.Screen
          name='Favorites'
          component={FavoritesScreen}
          options={{
            title: 'Meus Favoritos',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name='NotificationSettings'
          component={NotificationSettingsScreen}
          options={{
            title: 'Configurações de Notificação',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;