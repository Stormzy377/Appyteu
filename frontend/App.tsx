import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { LocationProvider } from "./src/context/LocationContext";
import { NotificationProvider } from "./src/context/NotificationContext";

export default function App() {
  return (
    <NotificationProvider>
      <LocationProvider>
        <FavoritesProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </FavoritesProvider>
      </LocationProvider>
    </NotificationProvider>


  );
}