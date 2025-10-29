import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNotifications } from "../context/NotificationContext";

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const {
    hasPermission,
    isEnabled,
    toggleNotifications,
    requestPermissions,
    showDemoNotification,
  } = useNotifications();

  const handleToggleNotifications = async (value: boolean) => {
    if (value && !hasPermission) {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert(
          "Permissão Necessária",
          "Para ativar notificações, precisas permitir o acesso nas definições do teu dispositivo.",
          [{ text: "OK" }]
        );
        return;
      }
    }
    toggleNotifications(value);
  };

  const handleTestNotification = async () => {
    if (!isEnabled) {
      Alert.alert(
        "Notificações Desativadas",
        "Ativa as notificações primeiro para testar.",
        [{ text: "OK" }]
      );
      return;
    }

    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    await showDemoNotification();
  };

  // ✅ CORREÇÃO - Configurações mock temporárias
  const [notificationSettings, setNotificationSettings] = React.useState({
    promotions: true,
    newRestaurants: true,
    nearbyDeals: true,
    locationBased: true,
  });

  const updateNotificationSettings = (newSettings: any) => {
    setNotificationSettings((prev) => ({ ...prev, ...newSettings }));
    // ✅ Em implementação real, isto guardaria no AsyncStorage
  };

  return (
    <View style={styles.container}>

      <ScrollView style={styles.content}>
        {/* Seção Principal */}
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color="#FF6B6B" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notificações Push</Text>
                <Text style={styles.settingDescription}>
                  Receber alertas e promoções
                </Text>
              </View>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: "#767577", true: "#FF6B6B" }}
              thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
            />
          </View>

          {!hasPermission && isEnabled && (
            <View style={styles.permissionWarning}>
              <Ionicons name="warning" size={16} color="#FF6B6B" />
              <Text style={styles.permissionText}>
                Permissão necessária. Vai às definições do teu dispositivo.
              </Text>
            </View>
          )}
        </View>

        {/* Preferências de Notificação */}
        {isEnabled && hasPermission && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tipos de Notificação</Text>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="pricetag" size={24} color="#4ECDC4" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Promoções e Descontos</Text>
                  <Text style={styles.settingDescription}>
                    Ofertas especiais de restaurantes
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationSettings.promotions}
                onValueChange={(value) =>
                  updateNotificationSettings({ promotions: value })
                }
                trackColor={{ false: "#767577", true: "#4ECDC4" }}
                thumbColor={
                  notificationSettings.promotions ? "#FFFFFF" : "#f4f3f4"
                }
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="restaurant" size={24} color="#F59E0B" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Novos Restaurantes</Text>
                  <Text style={styles.settingDescription}>
                    Novos estabelecimentos na tua área
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationSettings.newRestaurants}
                onValueChange={(value) =>
                  updateNotificationSettings({ newRestaurants: value })
                }
                trackColor={{ false: "#767577", true: "#F59E0B" }}
                thumbColor={
                  notificationSettings.newRestaurants ? "#FFFFFF" : "#f4f3f4"
                }
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="location" size={24} color="#EF4444" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Ofertas Próximas</Text>
                  <Text style={styles.settingDescription}>
                    Promoções de restaurantes perto de ti
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationSettings.nearbyDeals}
                onValueChange={(value) =>
                  updateNotificationSettings({ nearbyDeals: value })
                }
                trackColor={{ false: "#767577", true: "#EF4444" }}
                thumbColor={
                  notificationSettings.nearbyDeals ? "#FFFFFF" : "#f4f3f4"
                }
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="navigate" size={24} color="#22C55E" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>
                    Baseadas em Localização
                  </Text>
                  <Text style={styles.settingDescription}>
                    Alertas quando estás perto de restaurantes
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationSettings.locationBased}
                onValueChange={(value) =>
                  updateNotificationSettings({ locationBased: value })
                }
                trackColor={{ false: "#767577", true: "#22C55E" }}
                thumbColor={
                  notificationSettings.locationBased ? "#FFFFFF" : "#f4f3f4"
                }
              />
            </View>
          </View>
        )}

        {/* Botão de Teste */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.testButton,
              (!isEnabled || !hasPermission) && styles.testButtonDisabled,
            ]}
            onPress={handleTestNotification}
            disabled={!isEnabled || !hasPermission}
          >
            <Ionicons name="notifications" size={20} color="white" />
            <Text style={styles.testButtonText}>Testar Notificação</Text>
          </TouchableOpacity>

          <Text style={styles.testDescription}>
            Envia uma notificação de teste para verificar se está tudo a
            funcionar corretamente.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  permissionWarning: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  permissionText: {
    fontSize: 14,
    color: "#EF4444",
    marginLeft: 8,
    flex: 1,
  },
  testButton: {
    backgroundColor: "#FF6B6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  testButtonDisabled: {
    backgroundColor: "#CCC",
  },
  testButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  testDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 18,
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
});

export default NotificationSettingsScreen;
