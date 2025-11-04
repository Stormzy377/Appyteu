import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { LocationProvider } from "./src/context/LocationContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import { QueryProvider } from "./src/providers/QueryProvider";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";


const ThemedApp = () => {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />

      <QueryProvider>
           <NotificationProvider>
             <LocationProvider>
               <FavoritesProvider>
                 <StatusBar style="light" />
                 <AppNavigator />
               </FavoritesProvider>
             </LocationProvider>
           </NotificationProvider>
         </QueryProvider>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         
//       </AuthProvider>
//     </ThemeProvider>

  
//   );
// }

// const ThemedApp = () => {
//   const { colors, isDark } = useTheme();

//   return (
//     <>
//       <StatusBar
//         barStyle={isDark ? 'light-content' : 'dark-content'}
//         backgroundColor={colors.background}
//       />
//       <AppNavigator />
//     </>
//   )
// }