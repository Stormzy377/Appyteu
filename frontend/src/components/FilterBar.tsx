// Barra de Filtros
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
// import { styles } from './styles';
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type Filter = {
    id: string;
    label: string;
    type: 'cuisine' | 'price';
};

type FilterBarProps = {
    filters: Filter[];
    activeFilter: string | null;
    onFilterPress: (filterId: string | null) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({
    filters,
    activeFilter,
    onFilterPress
}) => {
    const { colors } = useTheme();
    const styles = useThemedStyles(createStyles);

    return (
        <View style = {styles.container2}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
        >
            <TouchableOpacity
            style={[
                styles.filterButton,
                activeFilter === null && styles.activeFilterButton
            ]}
            onPress={() => onFilterPress(null)}
            >
             <Text style={[
                styles.filterText,
                activeFilter === null && styles.activeFilterText
             ]}>
                Todos
            </Text>   
            </TouchableOpacity>

            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter.id}
                    style={[
                        styles.filterButton,
                        activeFilter === filter.id && styles.activeFilterButton
                    ]}
                    onPress={() => onFilterPress(filter.id)}
                    >
                        <Text style={[
                            styles.filterText,
                            activeFilter === filter.id && styles.activeFilterText
                        ]}
                        >
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    );
};

const createStyles = (colors: any) => ({
  container2: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
});

export default FilterBar;