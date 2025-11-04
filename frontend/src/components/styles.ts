import { Dimensions, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF6B6B",
    padding: 16,
    paddingTop: 60, // Espaço para o status bar
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 4,
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    // textAlign: "center",
    // marginTop: 4,
    opacity: 0.9,
  },

  // Cards dos restaurantes
  card: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: "#333",
  },
  cuisine: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  priceDescription: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  distance: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "600",
  },
  favoriteButton: {
    padding: 4,
    marginLeft: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  averagePrice: {
    fontSize: 12,
    color: "#666",
  }, // Estilo da Barra de Pesquisa
  // container1: {
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   backgroundColor: "#f8f9fa",
  // },
  // searchContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "white",
  //   borderRadius: 12,
  //   paddingHorizontal: 12,
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 3,
  // },
  // searchIcon: {
  //   marginRight: 8,
  // },
  // input: {
  //   flex: 1,
  //   paddingVertical: 12,
  //   fontSize: 16,
  //   color: "#333",
  // },
  // clearButton: {
  //   padding: 4,
  // },
  // Estilo da barra de filtro
  container2: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeFilterButton: {
    backgroundColor: "#FF6B6B",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
  }
});
