// // Card dos restaurantes

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantCardProps } from "../types";
import { useFavorites } from "../context/FavoritesContext";
// import { styles } from "./styles";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
}) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const navigation = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const renderStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case "₭":
        return "#22C55E";
      case "₭₭":
        return "#F59E0B";
      case "₭₭₭":
        return "#EF4444";
      default:
        return "#FF6B6B";
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      (navigation as any).navigate("Restaurant", {
        restaurantId: restaurant.id,
      });
    }
  };

  const handleFavoritePress = () => {
    toggleFavorite(restaurant);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header1}>
        <Text style={styles.emoji}>{restaurant.image}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
          <Text style={styles.priceDescription}>
            {restaurant.priceDescription}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isFavorite(restaurant.id) ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite(restaurant.id) ? "#FF6B6B" : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.rating}>
          {renderStars(restaurant.rating)} ({restaurant.rating})
        </Text>
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.price,
              { color: getPriceColor(restaurant.priceRange) },
            ]}
          >
            {restaurant.priceRange}
          </Text>
          {restaurant.averagePrice && (
            <Text style={styles.averagePrice}>
              {restaurant.averagePrice.toLocaleString("pt-AO")} AOA
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) => ({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header1: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  emoji: {
    fontSize: 40,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text, // ✅ COR DINÂMICA
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: colors.textSecondary, // ✅ COR DINÂMICA
    marginBottom: 4,
  },
  priceDescription: {
    fontSize: 12,
    color: colors.textSecondary, // ✅ COR DINÂMICA
  },
  favoriteButton: {
    padding: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: colors.text, // ✅ COR DINÂMICA
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  averagePrice: {
    fontSize: 12,
    color: colors.textSecondary, // ✅ COR DINÂMICA
  },
});

export default RestaurantCard;