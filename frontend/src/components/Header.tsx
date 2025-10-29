// CABEÇALHO DO LOGO
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.logo}>Appyteu</Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile' as never)}>
            <Ionicons name="person-circle" size={30} color="white" />
          </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Descobre restaurantes perto de ti</Text>
    </View>
  );
};

export default Header;
