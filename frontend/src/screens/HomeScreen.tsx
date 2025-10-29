import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Header from "../components/Header";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantMap from "../components/RestaurantMap";
import SearchBar from "../components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import FilterBar from "../components/FilterBar";
import { mockRestaurants } from "../data/mockRestaurants";
import { Restaurant } from "../types";
import { useNavigation } from "@react-navigation/native";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const filters = [
    { id: "angolan", label: "Angolana", type: "cuisine" as const },
    { id: "italian", label: "Italiana", type: "cuisine" as const },
    { id: "japanese", label: "Japonesa", type: "cuisine" as const },
    { id: "brazilian", label: "Brasileira", type: "cuisine" as const },
    { id: "cheap", label: "₭ Económico", type: "price" as const },
    { id: "medium", label: "₭₭ Moderado", type: "price" as const },
    { id: "expensive", label: "₭₭₭ Premium", type: "price" as const },
  ];

  // Filtrar restaurantes
  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter((restaurant) => {
      // Filtro de pesquisa
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro ativo
      let matchesFilter = true;
      if (activeFilter) {
        const filter = filters.find((f) => f.id === activeFilter);
        if (filter) {
          if (filter.type === "cuisine") {
            matchesFilter =
              restaurant.cuisine.toLowerCase() === filter.label.toLowerCase();
          } else if (filter.type === "price") {
            matchesFilter =
              restaurant.priceRange === filter.label.replace(/[^₭]/g, "");
          }
        }
      }
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterPress = (filterId: string | null) => {
    setActiveFilter(filterId);
  };

  const handleRestaurantPressFromMap = (restaurant: Restaurant) => {
    // Navega para os detalhes do restaurante
    (navigation as any).navigate("Restaurant", {
      restaurantId: restaurant.id,
    });
  };

  const toggleView = () => {
    setShowMap(!showMap);
  };

  // Localização mock do usuário (Luanda)
  const userLocation = {
    latitude: -8.8383,
    longitude: 13.2344,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <SearchBar onSearch={handleSearch} />
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterPress={handleFilterPress}
      />

      {/* Toggle entre Mapa e Lista */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, !showMap && styles.activeToggle]}
          onPress={() => setShowMap(false)}
        >
          <Ionicons name="list" size={20} color={!showMap ? "white" : "#666"} />
          <Text
            style={[styles.toggleText, !showMap && styles.activeToggleText]}
          >
            Lista
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, showMap && styles.activeToggle]}
          onPress={() => setShowMap(true)}
        >
          <Ionicons name="map" size={20} color={showMap ? "white" : "#666"} />
          <Text style={[styles.toggleText, showMap && styles.activeToggleText]}>
            Mapa
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Restaurantes Próximos</Text>
        <Text style={styles.subtitle}>
          {filteredRestaurants.length} restaurantes encontrados
        </Text>

        {showMap ? (
          // Vista do Mapa
          <RestaurantMap
            restaurants={filteredRestaurants}
            onRestaurantPress={handleRestaurantPressFromMap}
          />
        ) : (
          // Vista da Lista
          <ScrollView style={styles.list}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}

            {filteredRestaurants.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  Nenhum restaurante encontrado
                </Text>
                <Text style={styles.emptySubtext}>
                  Tenta ajustar a pesquisa ou filtros
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;