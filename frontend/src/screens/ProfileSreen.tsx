//Tela de perfil
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
    return (
      <ScrollView style={styles.container}>
        {/* Header do perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>Jhon Wick</Text>
          <Text style={styles.userEmail}>amoomeucachoro@gmail.com</Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle2}>Minhas Estatísticas</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Restaurantes Visitados</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Avaliações</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Fotos partilhadas</Text>
            </View>
          </View>
        </View>

        {/* Menu de opções */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle2}>Minha Conta</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Favorites" as never)}
          >
            <Ionicons name="heart" size={24} color="#FF6B6B" />
            <Text style={styles.menuText}>Restaurantes Favoritos</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="star" size={24} color="#FFD700" />
            <Text style={styles.menuText}>Minhas Avaliações</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("NotificationSettings" as never)}
          >
            <Ionicons name="notifications" size={24} color="#4ECDC4" />
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings" size={24} color="#666" />
            <Text style={styles.menuText}>Definições</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle" size={24} color="#999" />
            <Text style={styles.menuText}>Ajuda e Suporte</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
}

export default ProfileScreen;