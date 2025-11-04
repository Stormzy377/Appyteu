import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { Restaurant } from "../types";
import { useLocation } from "../context/LocationContext";

type RestaurantMapProps = {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurant: Restaurant) => void;
};

const RestaurantMap: React.FC<RestaurantMapProps> = ({
  restaurants,
  onRestaurantPress,
}) => {
  const { userLocation, isLoading } = useLocation();

  console.log("🗺️ RestaurantMap - Restaurantes recebidos:", restaurants.length);
  console.log("🗺️ RestaurantMap - UserLocation:", userLocation);

  // Região inicial baseada na localização do usuário ou Luanda
  const initialRegion = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    : {
        latitude: -8.8383,
        longitude: 13.2344,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>A carregar mapa...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        toolbarEnabled={true}
      >
        {/* Círculo de 1km ao redor do usuário */}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={1000} // 1km em metros
            strokeWidth={2}
            strokeColor="#FF6B6B"
            fillColor="rgba(255, 107, 107, 0.1)"
          />
        )}

        {/* Marcadores dos restaurantes */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            description={`${restaurant.cuisine} • ${restaurant.distance}m`}
            onPress={() => onRestaurantPress(restaurant)}
          >
            <View
              style={[
                styles.marker,
                restaurant.distance <= 500 && styles.markerClose,
                restaurant.distance > 500 &&
                  restaurant.distance <= 1000 &&
                  styles.markerMedium,
                restaurant.distance > 1000 && styles.markerFar,
              ]}
            >
              <Text style={styles.markerText}>{restaurant.image}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Legenda do mapa */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.legendClose]} />
          <Text style={styles.legendText}>Próximo (≤ 500m)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.legendMedium]} />
          <Text style={styles.legendText}>Perto (500m - 1km)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.legendFar]} />
          <Text style={styles.legendText}>Longe (&gt; 1km)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.75,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  marker: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  markerClose: {
    borderColor: "#22C55E",
  },
  markerMedium: {
    borderColor: "#F59E0B",
  },
  markerFar: {
    borderColor: "#EF4444",
  },
  markerText: {
    fontSize: 16,
  },
  legend: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 2,
  },
  legendClose: {
    backgroundColor: "white",
    borderColor: "#22C55E",
  },
  legendMedium: {
    backgroundColor: "white",
    borderColor: "#F59E0B",
  },
  legendFar: {
    backgroundColor: "white",
    borderColor: "#EF4444",
  },
  legendText: {
    fontSize: 12,
    color: "#333",
  },
});

export default RestaurantMap;