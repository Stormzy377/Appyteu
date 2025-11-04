import { useTheme } from "../src/context/ThemeContext";
import { StyleSheet } from "react-native";

export const useThemedStyles = (createStyles: (colors: any) => any) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return StyleSheet.create(styles);
};
