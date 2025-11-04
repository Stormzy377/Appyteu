import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RestaurantCard from "../components/RestaurantCard";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";

const FavoritesScreen = () => {
    const navigation = useNavigation();
    const { favorites, toggleFavorite } = useFavorites();
    const { colors } = useTheme();
    const styles = useThemedStyles(createStyles);

    return (
        
        <View style= {styles.container}>
            {/* Conteúdo da page */}
            <ScrollView style={styles.content}>
                {favorites.length === 0?(
                    <View style={styles.emptyState}>
                        <Ionicons name="heart-outline" size={64} color="#DDD" />
                        <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
                        <Text style={styles.emptyText}>Os restaurantes que adicionares aos favoritos aparecerão aqui!</Text>
                        <TouchableOpacity
                        style={styles.exploreButton}
                        onPress={() => navigation.navigate('Home' as never)}
                        >
                            <Text style={styles.exploreButtonText}>Explorar Restaurantes</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.favoritesList}>
                        <Text style={styles.favoritesCount}>
                            {favorites.length} {favorites.length === 1 ? 'restaurante favorito':'restaurantes favoritos'}
                        </Text>

                        {favorites.map((restaurant) => (
                            <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const createStyles = (colors: any) => ({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
    },
    placeholder: {
        width: 32,
    },
    content: {
        flex: 1,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    exploreButton: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        elevation: 2,
    },
    exploreButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    favoritesList: {
        paddingTop: 16,
    },
    favoritesCount: {
        fontSize: 16,
        color: '#666',
        marginHorizontal: 16,
        marginBottom: 8,
    },
});

export default FavoritesScreen;