import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import discoverStyles from '../../styles/discoverStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchRandomRecipes } from '../../api/recipeApi';
import { RootStackParamList } from '../../types/navigation';
import { ResultItem } from '../../types/ResultItem';
import { MaterialIcons } from '@expo/vector-icons';

const Discover = () => {
  const [recipes, setRecipes] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loadMoreRecipes = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newRecipes = await fetchRandomRecipes();

      // Filter out duplicates based on ID
      const existingIds = new Set(recipes.map(r => r.id));
      const uniqueNewRecipes = newRecipes.filter((r: ResultItem) => !existingIds.has(r.id));

      setRecipes(prev => [...prev, ...uniqueNewRecipes]);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    }
    setLoading(false);
  };

  const refreshRecipes = async () => {
    setRefreshing(true);
    try {
      const newRecipes = await fetchRandomRecipes();
      setRecipes(newRecipes);
    } catch (err) {
      console.error('Failed to refresh recipes:', err);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadMoreRecipes();
  }, []);

  const renderItem = ({ item }: { item: ResultItem }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecipeOverview', { item })}
      activeOpacity={0.8}
    >
      <View style={discoverStyles.card}>
        <Image source={{ uri: item.image }} style={discoverStyles.image} />
        <View style={discoverStyles.cardContent}>
          <Text style={discoverStyles.title}>{item.title}</Text>

          <View style={discoverStyles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <MaterialIcons
                key={i}
                name={i < Math.round((item.spoonacularScore ?? 0) / 20) ? 'star' : 'star-border'}
                size={18}
                color="gold"
                style={discoverStyles.starIcon}
              />
            ))}
            <Text style={discoverStyles.ratingText}>
              {Math.round((item.spoonacularScore ?? 0) / 20)}/5 Rating
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={discoverStyles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
        refreshing={refreshing}
        onRefresh={refreshRecipes}
        contentContainerStyle={recipes.length === 0 && discoverStyles.placeholderContainer}
        ListEmptyComponent={
          <View style={discoverStyles.placeholderContainer}>
            <Text style={discoverStyles.placeholderTitle}>Feed looking empty :(</Text>
            <Text style={discoverStyles.placeholderSubtitle}>
              Come back soon to discover new recipes from the community!
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Discover;
