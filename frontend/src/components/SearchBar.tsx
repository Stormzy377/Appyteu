// Barra de pesquisa
import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../../hooks/useThemedStyles";

type SearchBarProps = {
    onSearch: (query: string) => void;
    placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = "Pesquisar restaurantes..."
}) => {
    const { colors } = useTheme();
    const styles = useThemedStyles(createStyles);

    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <View style = {styles.container1}>
            <View style = {styles.searchContainer}>
                <Ionicons name = "search" size={20} color={colors.textSecondary} style={styles.searchIcon}/>

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textSecondary}
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                 />
                {query.length > 0 && (
                    <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                        <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const createStyles = (colors: any) => ({
  container1: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;