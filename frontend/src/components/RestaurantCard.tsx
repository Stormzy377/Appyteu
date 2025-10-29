// // Card dos restaurantes

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantCardProps } from "../types";
import { useFavorites } from "../context/FavoritesContext";
import { styles } from "./styles";

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
}) => {
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
            color={isFavorite(restaurant.id) ? "#FF6B6B" : "#666"}
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


export default RestaurantCard;