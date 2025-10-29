import { Restaurant, PRICE_RANGES } from "../types";
import locationService from "../services/locationService";

// Localização central de Luanda (para cálculo de distâncias)
const LUANDA_CENTER = {
  latitude: -8.8383,
  longitude: 13.2344,
};

// Gerar restaurantes com distâncias calculadas da localização central
const generateRestaurants = (): Restaurant[] => {
  const baseRestaurants = [
    {
      id: "1",
      name: "Pizzaria Napoli",
      cuisine: "Italiana",
      rating: 4.5,
      priceRange: "₭₭" as const,
      priceDescription: PRICE_RANGES.MEDIUM.description,
      averagePrice: 3500,
      image: "🍕",
      latitude: -8.8368,
      longitude: 13.2343,
      images: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
      ],
    },
    {
      id: "2",
      name: "Sushi Master",
      cuisine: "Japonesa",
      rating: 4.8,
      priceRange: "₭₭₭" as const,
      priceDescription: PRICE_RANGES.HIGH.description,
      averagePrice: 7500,
      image: "🍣",
      latitude: -8.8375,
      longitude: 13.235,
      images: [
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
        "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=500",
        "https://images.unsplash.com/photo-1553621042-f6e147245704?w=500",
      ],
    },
    {
      id: "3",
      name: "Muamba da Tia",
      cuisine: "Angolana",
      rating: 4.7,
      priceRange: "₭" as const,
      priceDescription: PRICE_RANGES.LOW.description,
      averagePrice: 1500,
      image: "🍛",
      latitude: -8.835,
      longitude: 13.233,
      images: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
      ],
    },
    {
      id: "4",
      name: "Churrascaria Brasil",
      cuisine: "Brasileira",
      rating: 4.3,
      priceRange: "₭₭" as const,
      priceDescription: PRICE_RANGES.MEDIUM.description,
      averagePrice: 4500,
      image: "🥩",
      latitude: -8.838,
      longitude: 13.2345,
      images: [
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
        "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=500",
        "https://images.unsplash.com/photo-1553621042-f6e147245704?w=500",
      ],
    },
    {
      id: "5",
      name: "Hamburgueria Luanda",
      cuisine: "Fast Food",
      rating: 4.2,
      priceRange: "₭" as const,
      priceDescription: PRICE_RANGES.LOW.description,
      averagePrice: 1800,
      image: "🍔",
      latitude: -8.836,
      longitude: 13.2335,
      images: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
      ],
    },
    {
      id: "6",
      name: "Marisqueira Atlântico",
      cuisine: "Frutos do Mar",
      rating: 4.9,
      priceRange: "₭₭₭" as const,
      priceDescription: PRICE_RANGES.HIGH.description,
      averagePrice: 8500,
      image: "🦐",
      latitude: -8.839,
      longitude: 13.236,
      images: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
      ],
    },
  ];

  // Calcular distâncias reais da localização central
  return baseRestaurants.map((restaurant) => ({
    ...restaurant,
    distance: locationService.calculateDistance(
      LUANDA_CENTER.latitude,
      LUANDA_CENTER.longitude,
      restaurant.latitude,
      restaurant.longitude
    ),
  }));
};

export const mockRestaurants: Restaurant[] = generateRestaurants();

// Função para calcular distâncias da localização atual do usuário
export const calculateDistancesFromUser = (
  userLat: number,
  userLon: number
): Restaurant[] => {
  return mockRestaurants.map((restaurant) => ({
    ...restaurant,
    distance: locationService.calculateDistance(
      userLat,
      userLon,
      restaurant.latitude,
      restaurant.longitude
    ),
  }));
};
