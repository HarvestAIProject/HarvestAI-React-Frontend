import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import searchStyles from '../styles/searchStyles';
import { ResultItem } from '../types/ResultItem';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchResults = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/search?query=${query}`);
      const data = await res.json();
      setResults(data.results || []); // adjust if API response structure differs
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <View style={searchStyles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={searchStyles.backButton}
      >
        <MaterialIcons name="arrow-back-ios" size={28} color="black" />
      </TouchableOpacity>

      <View style={searchStyles.searchBar}>
        <FontAwesome name="search" size={18} color="#6b7280" />
        <TextInput
          style={searchStyles.searchInput}
          placeholder="Search recipes & ingredients"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>

      {loading ? (
        <ActivityIndicator size="small" style={searchStyles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={searchStyles.resultList}
          renderItem={({ item }) => (
            <TouchableOpacity style={searchStyles.resultCard}>
              <Text style={searchStyles.resultTitle}>{item.title}</Text>
              {/* Optionally add distance, rating, image, etc. */}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;
