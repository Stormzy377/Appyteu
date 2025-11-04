import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/AppNavigator";
import { mockRestaurants } from "../data/mockRestaurants";
import ImageCarousel from "../components/ImageCarousel";
import ImageViewer from "../components/ImageViewer";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type RestaurantScreenRouteProp = RouteProp<RootStackParamList, "Restaurant">;

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const route = useRoute<RestaurantScreenRouteProp>();
  const { restaurantId } = route.params;

  console.log("🟡 RestaurantScreen carregando - ID:", restaurantId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  // Encontrar o restaurante pelos dados mock
  const restaurant = mockRestaurants.find((r) => r.id === restaurantId);

  console.log("🟡 Restaurante encontrado:", restaurant);

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Restaurante não encontrado</Text>
        <Text style={styles.errorSubtext}>ID: {restaurantId}</Text>
      </View>
    );
  }

  const renderStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageViewerVisible(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* ✅ CAROUSEL ADICIONADO NO TOPO */}
        <ImageCarousel
          images={restaurant.images || []}
          onImagePress={handleImagePress}
        />

        {/* Header com imagem - MANTIDO ORIGINAL */}
        <View style={styles.header}>
          <Text style={styles.emojiHeader}>{restaurant.image}</Text>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        </View>

        {/* Informações principais - MANTIDO ORIGINAL */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>
              {restaurant.rating} ({renderStars(restaurant.rating)})
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="pricetag" size={20} color="#FF6B6B" />
            <Text style={styles.price}>
              {restaurant.priceRange} - {restaurant.priceDescription}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="#4ECDC4" />
            <Text style={styles.distance}>
              {restaurant.distance}m de distância
            </Text>
          </View>

          {restaurant.averagePrice && (
            <View style={styles.infoRow}>
              <Ionicons name="cash" size={20} color="#22C55E" />
              <Text style={styles.averagePrice}>
                Preço médio: {restaurant.averagePrice.toLocaleString("pt-AO")}{" "}
                AOA
              </Text>
            </View>
          )}
        </View>

        {/* Ações - MANTIDO ORIGINAL */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="call" size={20} color="white" />
            <Text style={styles.primaryButtonText}>
              Ligar para o Restaurante
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="navigate" size={20} color="#FF6B6B" />
            <Text style={styles.secondaryButtonText}>Como Chegar</Text>
          </TouchableOpacity>
        </View>

        {/* Descrição - MANTIDO ORIGINAL */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Sobre o Restaurante</Text>
          <Text style={styles.description}>
            Experimente a autêntica culinária {restaurant.cuisine.toLowerCase()}{" "}
            no coração de Luanda. Ambiente acolhedor e preços acessíveis para
            toda a família.
            {restaurant.images &&
              restaurant.images.length > 0 &&
              " Confira as fotos acima!"}
          </Text>
        </View>

        {/* ✅ GALERIA DE FOTOS ADICIONADA */}
        {restaurant.images && restaurant.images.length > 0 && (
          <View style={styles.gallerySection}>
            <Text style={styles.sectionTitle}>Galeria de Fotos</Text>
            <Text style={styles.gallerySubtitle}>
              Toque numa foto para ver em tamanho maior
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.galleryContainer}>
                {restaurant.images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.galleryItem}
                    onPress={() => handleImagePress(index)}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.galleryImage}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* ✅ MODAL para Visualização em Tela Cheia */}
      <Modal
        visible={isImageViewerVisible}
        transparent={false}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={handleCloseImageViewer}
      >
        <ImageViewer
          images={restaurant.images || []}
          initialIndex={selectedImageIndex}
          onClose={handleCloseImageViewer}
        />
      </Modal>
    </View>
  );
};

// ✅ ADICIONA ESTA IMPORTÇÃO
import { Image } from "react-native";

const createStyles = (colors: any) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  // ✅ ESTILOS ORIGINAIS MANTIDOS
  header: {
    backgroundColor: colors.background,
    alignItems: "center",
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emojiHeader: {
    fontSize: 64,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  cuisine: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: colors.background,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  rating: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  price: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  distance: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  averagePrice: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
    fontWeight: "600",
  },
  actionsSection: {
    margin: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#FF6B6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  descriptionSection: {
    backgroundColor: colors.background,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: "#FF6B6B",
    textAlign: "center",
    marginTop: 100,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  // ✅ NOVOS ESTILOS PARA GALERIA
  gallerySection: {
    backgroundColor: colors.background,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  gallerySubtitle: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
  },
  galleryContainer: {
    flexDirection: "row",
  },
  galleryItem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
    elevation: 2,
  },
  galleryImage: {
    width: "100%",
    height: "100%",
  },
});

export default RestaurantScreen;
