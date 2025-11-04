// Navegação
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import ProfileScreen from '../screens/ProfileSreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../components/SpashScreen';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
  // Telas públicas
  Login: undefined;
  Register: undefined;

  // Telas protegidas
  Home: undefined;
  Restaurant: { restaurantId: string };
  Profile: undefined;
  Favorites: undefined;
  NotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar splashScreen enquanto verifica autenticação
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          // FLUXO DE AUTENTICAÇÃO (usuário não logado)
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                animation: "fade"
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            />
          </Stack.Group>
        ) : (
          // APP PRINCIPAL (usuário logado)
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
                animation: "fade",
              }}
            />
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
              options={{ 
                title: 'Detalhes do restaurante',
                headerStyle: {
                  backgroundColor: '#FF6B6B',
                },
                headerTintColor: 'white',
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ 
                title: 'Meu Perfil',
                headerStyle: {
                  backgroundColor: '#FF6B6B',
                },
                headerTintColor: 'white',
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{
                title: 'Meus Favoritos',
                headerStyle: {
                  backgroundColor: '#FF6B6B',
                },
                headerTintColor: 'white',
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen
              name="NotificationSettings"
              component={NotificationSettingsScreen}
              options={{
                title: 'Configurações de Notificação',
                headerStyle: {
                  backgroundColor: '#FF6B6B',
                },
                headerTintColor: 'white',
                animation: 'slide_from_right'
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Home'>
//         <Stack.Screen
//           name='Home'
//           component={HomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='Restaurant'
//           component={RestaurantScreen}
//           options={{ title: 'Detalhes do restaurante' }}
//         />
//         <Stack.Screen
//           name='Profile'
//           component={ProfileScreen}
//           options={{ title: 'Meu Perfil' }}
//         />
//         <Stack.Screen
//           name='Favorites'
//           component={FavoritesScreen}
//           options={{
//             title: 'Meus Favoritos',
//             headerStyle: {
//               backgroundColor: '#FF6B6B',
//             },
//             headerTintColor: 'white',
//           }}
//         />
//         <Stack.Screen
//           name='NotificationSettings'
//           component={NotificationSettingsScreen}
//           options={{
//             title: 'Configurações de Notificação',
//             headerStyle: {
//               backgroundColor: '#FF6B6B',
//             },
//             headerTintColor: 'white',
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;