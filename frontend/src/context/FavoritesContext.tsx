import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restaurant } from '../types';

interface FavoritesContextType {
    favorites: Restaurant[];
    addFavorite: (restaurant: Restaurant) => void;
    removeFavorite: (restaurantId: string) => void;
    isFavorite: (restaurantId: string) => boolean;
    toggleFavorite: (restaurant: Restaurant) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Restaurant[]>([]);

    // Carregar favoritos do AsyncStorage ao iniciar o aplicativo
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('@Appyteu_favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.log('Erro ao carregar favoritos:', error);
        }
    };

    const saveFavorites = async (newFavorites: Restaurant[]) => {
        try {
            await AsyncStorage.setItem('@Appyteu_favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.log('Erro ao salvar favoritos:', error);
        }
    };

    const addFavorite = (restaurant: Restaurant) => {
        const newFavorites = [...favorites, restaurant];
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const removeFavorite = (restaurantId: string) => {
        const newFavorites = favorites.filter(fav => fav.id !== restaurantId);
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const isFavorite = (restaurantId: string) => {
        return favorites.some(fav => fav.id === restaurantId);
    };

    const toggleFavorite = (restaurant: Restaurant) => {
        if (isFavorite(restaurant.id)) {
            removeFavorite(restaurant.id);
        } else {
            addFavorite(restaurant);
        }
    };

    return (
        <FavoritesContext.Provider value={{ 
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
            toggleFavorite 
            }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Hook personalizado para usar o contexto de favoritos
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};