import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import searchStyles from '../styles/searchStyles';
import { ResultItem } from '../types/ResultItem';
import { searchRecipes } from '../api/recipeApi';


const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchResults = async (q: string = query) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await searchRecipes(trimmed);
      setResults(data.results || data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 500);
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
          style={[searchStyles.searchInput, { flex: 1 }]}
          placeholder="Search recipes"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); setResults([]); }}>
            <FontAwesome name="times-circle" size={18} color="#6b7280" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="small" style={searchStyles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={searchStyles.resultList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={searchStyles.resultCard}
              onPress={() => navigation.navigate('RecipeOverview', { item })}
            >
              <Text style={searchStyles.resultTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;
