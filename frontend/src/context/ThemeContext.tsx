import Ract, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeType = 'light' | 'dark' | 'auto';

interface ThemeColors {
    background: string;
    backcgroundSecondary: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    primaryLight: string;
    error: string;
    success: string;
    warning: string;
}

interface ThemeContextData {
    theme: ThemeType;
    colors: ThemeColors;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (theme: ThemeType) => void;
}

const lightColors: ThemeColors = {
    background: '#FFFFFF',
    backcgroundSecondary: '#F8F9FA',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    primary: '#FF6B6B',
    primaryLight: '#FF8E8E',
    error: '#FF3B30',
    success: '#4CD964',
    warning: '#FFCC00'
};

const darkColors: ThemeColors = {
  background: "#121212",
  backcgroundSecondary: "#1E1E1E",
  card: "#2D2D2D",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  border: "#404040",
  primary: "#FF6B6B",
  primaryLight: "#FF8E8E",
  error: "#FF453A",
  success: "#30D158",
  warning: "#FFD60A",
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorsScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeType>('auto');

    // Calcular se é dark mode
    const isDark = theme === 'auto'
    ? systemColorsScheme === 'dark'
    : theme === 'dark';

    // Cores baseadas no tema
    const colors = isDark ? darkColors : lightColors;

    // Carregar tema salvo
    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('@Appyteu:theme');
            if (savedTheme) {
                setTheme(savedTheme as ThemeType);
            }
        } catch (error) {
            console.log('Erro ao carregar tema:', error);
        }
    };

    const saveTheme = async (newTheme: ThemeType) => {
        try {
            await AsyncStorage.setItem('@Appyteu:theme', newTheme);
        } catch (error) {
            console.log('Erro ao salvar tema:', error);
        }
    };

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
        saveTheme(newTheme);
    };

    const handleSetTheme = ( newTheme: ThemeType) => {
        setTheme(newTheme);
        saveTheme(newTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colors,
                isDark,
                toggleTheme,
                setTheme: handleSetTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};