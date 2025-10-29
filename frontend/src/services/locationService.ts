import * as location from 'expo-location';
import { Alert } from 'react-native';

export interface UserLocation {
    latitude: number;
    longitude: number;
    accuracy: number;
}

class LocationService {
    // Pedir permissão para acessar a localização do usuário
    async requestLocationPermission(): Promise<boolean> {
        try {
            const { status } = await location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permissão de Localização Necessária', 'O Appyteu precisa da tua localização para mostrar restaurantes próximos. Por favor, permite o acesso à localização nas configurações do teu dispositivo.',
                    [{ text: 'OK' }]
                );
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro ao pedir permissão:', error);
            return false;
        }
    }

    // Obter a localização atual do usuário
    async getCurrentLocation(): Promise<UserLocation | null> {
        try {
            const hasPermission = await this.requestLocationPermission();

            if (!hasPermission) {
                return null;
            }

            // Obter a localização atual
            const currentLocation = await location.getCurrentPositionAsync({
                accuracy: location.Accuracy.Balanced,
            });

            return {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                accuracy: currentLocation.coords.accuracy ?? 0,
            };
        } catch (error) {
            console.error('Erro ao obter localização:', error);

            Alert.alert('Localização Indisponível', 'Não foi possível obter a tua localização. Por favor, verifica se o GPS está ativo e tenta novamente.',
                [{ text: 'OK' }]
            );

            return null;
        }
    }

    // Calcular a distância entre dois pontos geográficos usando a fórmula de Haversine
    calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number {
        const R = 6371e3; // Raio da Terra em metros
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ em radianos
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // em metros

        return Math.round(distance); // Retorna a distância arredondada, em metros
    }

    // (Testes) Verificar se a localização está em Luanda
    isInLuanda(latitude: number, longitude: number): boolean {
        // Área aproximada de Luanda
        const luandaBounds = {
            minLat: -9.0,
            maxLat: -8.5,
            minLon: 12.5,
            maxLon: 14.0,
        };

        return (
          latitude >= luandaBounds.minLat &&
          latitude <= luandaBounds.maxLat &&
          longitude >= luandaBounds.minLon &&
          longitude <= luandaBounds.maxLon
        );
    }
}

export default new LocationService();