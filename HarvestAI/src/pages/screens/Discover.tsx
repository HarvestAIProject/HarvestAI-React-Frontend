import React, { useEffect, useRef, useState } from 'react';
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
  const [loadingInitial, setLoadingInitial] = useState(true);  // initial load
  const [loadingMore, setLoadingMore] = useState(false);       // pagination
  const [refreshing, setRefreshing] = useState(false);         // pull-to-refresh

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Optional: guard duplicate onEndReached triggers
  const endReachedGuard = useRef(false);

  const mergeUnique = (current: ResultItem[], incoming: ResultItem[]) => {
    const existingIds = new Set(current.map(r => r.id));
    return [...current, ...incoming.filter(r => !existingIds.has(r.id))];
  };

  const fetchInitial = async () => {
    setLoadingInitial(true);
    try {
      const newRecipes = await fetchRandomRecipes();
      setRecipes(newRecipes);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    } finally {
      setLoadingInitial(false);
    }
  };

  const refreshRecipes = async () => {
    setRefreshing(true);
    try {
      const newRecipes = await fetchRandomRecipes();
      setRecipes(newRecipes);
    } catch (err) {
      console.error('Failed to refresh recipes:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const loadMoreRecipes = async () => {
    // Don’t paginate if we’re already loading, refreshing, or during initial load
    if (loadingMore || loadingInitial || refreshing) return;

    setLoadingMore(true);
    try {
      const newRecipes = await fetchRandomRecipes();
      setRecipes(prev => mergeUnique(prev, newRecipes));
    } catch (err) {
      console.error('Failed to fetch more recipes:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchInitial();
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
        onEndReached={() => {
          if (!endReachedGuard.current) {
            endReachedGuard.current = true;
            loadMoreRecipes();
          }
        }}
        onMomentumScrollBegin={() => {
          endReachedGuard.current = false;
        }}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={refreshRecipes}
        contentContainerStyle={
          recipes.length === 0 ? discoverStyles.placeholderContent : undefined
        }
        ListEmptyComponent={
          loadingInitial ? (
            // Initial load: centered spinner ONLY (no empty text)
            <ActivityIndicator size="large" />
          ) : (
            // Empty state when not loading
            <View>
              <Text style={discoverStyles.placeholderTitle}>Feed looking empty :(</Text>
              <Text style={discoverStyles.placeholderSubtitle}>
                Come back soon to discover new recipes from the community!
              </Text>
            </View>
          )
        }
        // Footer spinner ONLY when there are items and we’re paginating
        ListFooterComponent={
          recipes.length > 0 && loadingMore ? <ActivityIndicator size="small" /> : null
        }
        ListFooterComponentStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

export default Discover;
