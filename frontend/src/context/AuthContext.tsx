// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ MODIFICAR: Verificar AsyncStorage ao iniciar
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // ✅ MODIFICAR: Verificar se existe user no AsyncStorage
      const userData = await AsyncStorage.getItem("@Appyteu:user");

      if (userData) {
        const savedUser = JSON.parse(userData);
        setUser(savedUser);
        console.log("✅ Sessão recuperada:", savedUser);
      }
    } catch (error) {
      console.error("❌ Erro ao verificar sessão:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ MODIFICAR COMPLETAMENTE a função login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // ✅ ADICIONAR: Log para debugging
      console.log("🔐 Tentativa de login:", { email, password });

      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ MODIFICAR: Validação básica
      if (!email || !password) {
        throw new Error("Email e password são obrigatórios");
      }

      // ✅ MODIFICAR: User dinâmico baseado no email
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9), // ID aleatório
        name: capitalizeFirstLetter(email.split("@")[0].replace(".", " ")), // Nome do email
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          email.split("@")[0]
        )}&background=FF6B6B&color=fff&size=150`,
      };

      setUser(mockUser);

      // ✅ ADICIONAR: Salvar no AsyncStorage
      await AsyncStorage.setItem("@Appyteu:user", JSON.stringify(mockUser));

      console.log("✅ Login bem-sucedido:", mockUser);
    } catch (error) {
      console.error("❌ Erro no login:", error);
      Alert.alert("Erro", "Credenciais inválidas. Tente novamente.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ MODIFICAR a função register
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("📝 Tentativa de registo:", { name, email, password });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ MODIFICAR: Validações
      if (!name || !email || !password) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (password.length < 3) {
        throw new Error("Password deve ter pelo menos 3 caracteres");
      }

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=FF6B6B&color=fff&size=150`,
      };

      setUser(mockUser);

      // ✅ ADICIONAR: Salvar no AsyncStorage
      await AsyncStorage.setItem("@Appyteu:user", JSON.stringify(mockUser));

      console.log("✅ Registo bem-sucedido:", mockUser);
    } catch (error) {
      console.error("❌ Erro no registo:", error);
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ MODIFICAR a função logout
  const logout = async () => {
    try {
      // ✅ ADICIONAR: Limpar AsyncStorage
      await AsyncStorage.removeItem("@Appyteu:user");
      setUser(null);
      console.log("🚪 Logout realizado");
    } catch (error) {
      console.error("❌ Erro no logout:", error);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    // ✅ ADICIONAR: Atualizar também no AsyncStorage
    AsyncStorage.setItem("@Appyteu:user", JSON.stringify(updatedUser));
  };

  // ✅ ADICIONAR: Função helper para capitalizar nome
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

   
//     setIsLoading(true);
//     try {
//       // TODO: Integrar com API real
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Mock user - substituir por resposta da API
//     //   const mockUser: User = {
//     //     id: "1",
//     //     name: "João Silva",
//     //     email: email,
//     //     avatar:
//     //       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//     //   };

//       setUser(mockUser);
//       // TODO: Salvar token no AsyncStorage
//     } catch (error) {
//       Alert.alert("Erro", "Credenciais inválidas. Tente novamente.");
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       // TODO: Integrar com API real
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       const mockUser: User = {
//         id: "1",
//         name: name,
//         email: email,
//       };

//       setUser(mockUser);
//     } catch (error) {
//       Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     // TODO: Limpar AsyncStorage
//   };

//   const updateUser = (updatedUser: User) => {
//     setUser(updatedUser);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         login,
//         register,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };