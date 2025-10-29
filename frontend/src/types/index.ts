// TIPOS TYPESCRIPT
// ESTOU A USAR TIPOS PARA EVITAR MUITOS ERROS, É MELHOR DE AUTOCOMPLEMENTAR E O CÓDIGO FICA MAIS CLARO
export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: "₭" | "₭₭" | "₭₭₭";
  priceDescription: string;
  distance: number; // em metros
  image: string;
  latitude: number;
  longitude: number;
  averagePrice?: number; // Preço médio em AOA
  images?: string[];
};

// TIPO PARA PROPS DO COMPONENTE RESTAURANTCARD
export type RestaurantCardProps = {
  restaurant: Restaurant;
  onPress?: () => void;
};

// Faixas de preço em Kwanza ₭₭₭
export const PRICE_RANGES = {
  LOW: {
    symbol: "₭",
    description: "Económico (até 2.000 AOA)",
    maxPrice: 2000,
  },
  MEDIUM: {
    symbol: "₭₭",
    description: "Moderado (20.000 - 30.000 AOA)",
    minPrice: 20000,
    maxPrice: 30000,
  },
  HIGH: {
    symbol: "₭₭₭",
    description: "Premium (acima de 70.000 AOA)",
    maxPrice: 70000,
  }
} as const;
