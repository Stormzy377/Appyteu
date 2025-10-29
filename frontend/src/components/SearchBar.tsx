// Barra de pesquisa
import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";

type SearchBarProps = {
    onSearch: (query: string) => void;
    placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = "Pesquisar restaurantes..."
}) => {
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
                <Ionicons name = "search" size={20} color="#666" style={styles.searchIcon}/>

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                 />
                {query.length > 0 && (
                    <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                        <Ionicons name="close-circle" size={18} color="#999" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default SearchBar;