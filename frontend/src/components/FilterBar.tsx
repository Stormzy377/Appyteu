// Barra de Filtros
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { styles } from './styles';

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

export default FilterBar;