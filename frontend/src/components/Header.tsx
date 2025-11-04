import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";


const Header = () => {
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useThemedStyles(createStyles);

  const handleProfilePress = () => {
    navigation.navigate("Profile" as never);
  };

  return (
    <View style={styles.container}>
      {/* Logo e Título */}
      <View style={styles.logoContainer}>
        {/* <Text style={styles.logo}>🍽️</Text> */}
        <Text style={styles.title}>Appyteu</Text>
      </View>

      {/* Botões à direita */}
      <View style={styles.actionsContainer}>
        {/* Theme Toggle */}
        <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Botão Perfil */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleProfilePress}
        >
          <Ionicons name="person" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Header;

// const Header = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.header}>
//       <View style={styles.headerContent}>
//         <Text style={styles.logo}>Appyteu</Text>

//         <TouchableOpacity
//           style={styles.profileButton}
//           onPress={() => navigation.navigate('Profile' as never)}>
//             <Ionicons name="person-circle" size={30} color="white" />
//           </TouchableOpacity>
//       </View>

//       <Text style={styles.subtitle}>Descobre restaurantes perto de ti</Text>
//     </View>
//   );
// };

// export default Header;
