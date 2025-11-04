import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantMap from "../components/RestaurantMap";
import SearchBar from "../components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import FilterBar from "../components/FilterBar";
import { mockRestaurants } from "../data/mockRestaurants";
import { Restaurant } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../context/ThemeContext";

const HomeScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const styles = useThemedStyles(createStyles);

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
    (navigation as any).navigate("Restaurant", {
      restaurantId: restaurant.id,
    });
  };

  const toggleView = () => {
    setShowMap(!showMap);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Customizado com Theme Toggle */}

      <Header />

      {/* Search Bar - Precisa ser atualizado para usar theme */}
      <SearchBar onSearch={handleSearch} />

      {/* Filter Bar - Precisa ser atualizado para usar theme */}
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
          <Ionicons
            name="list"
            size={20}
            color={!showMap ? colors.background : colors.textSecondary}
          />
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
          <Ionicons
            name="map"
            size={20}
            color={showMap ? colors.background : colors.textSecondary}
          />
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
                <Ionicons
                  name="search"
                  size={48}
                  color={colors.textSecondary}
                />
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

// Função que cria estilos baseados no tema
const createStyles = (colors: any) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  themeToggle: {
    padding: 8,
    marginLeft: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  viewToggle: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  activeToggleText: {
    color: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: "center",
  },
});

export default HomeScreen;

  //   const styles = useThemedStyles(createStyles);

//   const filters = [
//     { id: "angolan", label: "Angolana", type: "cuisine" as const },
//     { id: "italian", label: "Italiana", type: "cuisine" as const },
//     { id: "japanese", label: "Japonesa", type: "cuisine" as const },
//     { id: "brazilian", label: "Brasileira", type: "cuisine" as const },
//     { id: "cheap", label: "₭ Económico", type: "price" as const },
//     { id: "medium", label: "₭₭ Moderado", type: "price" as const },
//     { id: "expensive", label: "₭₭₭ Premium", type: "price" as const },
//   ];

//   // Filtrar restaurantes
//   const filteredRestaurants = useMemo(() => {
//     return mockRestaurants.filter((restaurant) => {
//       // Filtro de pesquisa
//       const matchesSearch =
//         restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

//       // Filtro ativo
//       let matchesFilter = true;
//       if (activeFilter) {
//         const filter = filters.find((f) => f.id === activeFilter);
//         if (filter) {
//           if (filter.type === "cuisine") {
//             matchesFilter =
//               restaurant.cuisine.toLowerCase() === filter.label.toLowerCase();
//           } else if (filter.type === "price") {
//             matchesFilter =
//               restaurant.priceRange === filter.label.replace(/[^₭]/g, "");
//           }
//         }
//       }
//       return matchesSearch && matchesFilter;
//     });
//   }, [searchQuery, activeFilter]);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleFilterPress = (filterId: string | null) => {
//     setActiveFilter(filterId);
//   };

//   const handleRestaurantPressFromMap = (restaurant: Restaurant) => {
//     // Navega para os detalhes do restaurante
//     (navigation as any).navigate("Restaurant", {
//       restaurantId: restaurant.id,
//     });
//   };

//   const toggleView = () => {
//     setShowMap(!showMap);
//   };

//   // Localização mock do usuário (Luanda)
//   const userLocation = {
//     latitude: -8.8383,
//     longitude: 13.2344,
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />

//       <SearchBar onSearch={handleSearch} />
//       <FilterBar
//         filters={filters}
//         activeFilter={activeFilter}
//         onFilterPress={handleFilterPress}
//       />

//       {/* Toggle entre Mapa e Lista */}
//       <View style={styles.viewToggle}>
//         <TouchableOpacity
//           style={[styles.toggleButton, !showMap && styles.activeToggle]}
//           onPress={() => setShowMap(false)}
//         >
//           <Ionicons name="list" size={20} color={!showMap ? "white" : "#666"} />
//           <Text
//             style={[styles.toggleText, !showMap && styles.activeToggleText]}
//           >
//             Lista
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.toggleButton, showMap && styles.activeToggle]}
//           onPress={() => setShowMap(true)}
//         >
//           <Ionicons name="map" size={20} color={showMap ? "white" : "#666"} />
//           <Text style={[styles.toggleText, showMap && styles.activeToggleText]}>
//             Mapa
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.title}>Restaurantes Próximos</Text>
//         <Text style={styles.subtitle}>
//           {filteredRestaurants.length} restaurantes encontrados
//         </Text>

//         {showMap ? (
//           // Vista do Mapa
//           <RestaurantMap
//             restaurants={filteredRestaurants}
//             onRestaurantPress={handleRestaurantPressFromMap}
//           />
//         ) : (
//           // Vista da Lista
//           <ScrollView style={styles.list}>
//             {filteredRestaurants.map((restaurant) => (
//               <RestaurantCard key={restaurant.id} restaurant={restaurant} />
//             ))}

//             {filteredRestaurants.length === 0 && (
//               <View style={styles.emptyState}>
//                 <Text style={styles.emptyText}>
//                   Nenhum restaurante encontrado
//                 </Text>
//                 <Text style={styles.emptySubtext}>
//                   Tenta ajustar a pesquisa ou filtros
//                 </Text>
//               </View>
//             )}
//           </ScrollView>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;