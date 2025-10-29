import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NotificationContextType {
  hasPermission: boolean;
  isEnabled: boolean;
  toggleNotifications: (enabled: boolean) => void;
  requestPermissions: () => Promise<boolean>;
  scheduleLocalNotification: (
    title: string,
    body: string,
    data?: any
  ) => Promise<void>;
  showDemoNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

// Configurar handler de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // Configurar listeners e carregar settings
  useEffect(() => {
    configureNotifications();
    loadSettings();
  }, []);

  const configureNotifications = () => {
    // Listener para quando a notificação é recebida
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("📱 Notificação recebida:", notification);
      }
    );

    // Listener para quando a notificação é clicada
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👆 Notificação clicada:", response);
        // Aqui podemos adicionar navegação baseada na notificação
      });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  };

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem(
        "@Appyteu_notification_settings"
      );
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setIsEnabled(settings.isEnabled);
      }
    } catch (error) {
      console.log("❌ Erro ao carregar configurações:", error);
    }
  };

  const saveSettings = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(
        "@Appyteu_notification_settings",
        JSON.stringify({
          isEnabled: enabled,
        })
      );
    } catch (error) {
      console.log("❌ Erro ao guardar configurações:", error);
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === "granted") {
        setHasPermission(true);

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF6B6B",
          });
        }

        return true;
      } else {
        setHasPermission(false);
        Alert.alert(
          "Permissão Necessária",
          "Ative as notificações para receber promoções e novidades de restaurantes próximos!"
        );
        return false;
      }
    } catch (error) {
      console.log("❌ Erro ao pedir permissões:", error);
      return false;
    }
  };

  const toggleNotifications = async (enabled: boolean) => {
    setIsEnabled(enabled);
    await saveSettings(enabled);

    if (enabled) {
      await requestPermissions();
    }
  };

  const scheduleLocalNotification = async (
    title: string,
    body: string,
    data?: any
  ) => {
    if (!isEnabled || !hasPermission) return;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: data || {},
          sound: true,
          color: "#FF6B6B",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2, // Mostra após 2 segundos (para teste)
          repeats: false,
        },
      });
    } catch (error) {
      console.log("❌ Erro ao agendar notificação:", error);
    }
  };

  const showDemoNotification = async () => {
    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    await scheduleLocalNotification(
      "🍽️ Appyteu - Promoção Próxima!",
      "O Pizzaria Napoli tem 20% de desconto hoje! A apenas 350m de distância.",
      { restaurantId: "1", type: "promotion" }
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        hasPermission,
        isEnabled,
        toggleNotifications,
        requestPermissions,
        scheduleLocalNotification,
        showDemoNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};