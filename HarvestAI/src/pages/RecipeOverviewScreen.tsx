// RecipeOverviewScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import recipeOverviewStyles from '../styles/recipeOverviewStyles';
import {
  fetchRecipeInfo,
  fetchRecipeNutrition,
  fetchRecipeSummary,
} from '../api/recipeApi';
import { useFavorites } from '../context/FavoritesContext';
import type { FavoriteItem } from '../types/FavoriteItem';

const RecipeOverviewScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipeOverview'>>();
  const { item } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { isFavorite, toggle } = useFavorites();
  const [liked, setLiked] = useState(false);

  const [nutrition, setNutrition] = useState<any>(null);
  const [summary, setSummary] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  // ⭐ local rating that falls back to fetched info if item has no score
  const [ratingScore, setRatingScore] = useState<number>(item.spoonacularScore ?? 0);

  // keep heart in sync with favorites
  useEffect(() => {
    setLiked(isFavorite(item.id));
  }, [isFavorite, item.id]);

  // fetch info/summary/nutrition once; populate tags + score from info
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [nutData, sumData, infoData] = await Promise.all([
          fetchRecipeNutrition(item.id),
          fetchRecipeSummary(item.id),
          fetchRecipeInfo(item.id),
        ]);

        if (!isMounted) return;

        setNutrition(nutData);
        setSummary(sumData?.summary ?? '');

        // tags from info
        const nextTags: string[] = [
          ...((infoData?.dishTypes as string[] | undefined) ?? []),
          ...((infoData?.cuisines as string[] | undefined) ?? []),
        ];
        setTags(nextTags);

        // update rating if available
        if (typeof infoData?.spoonacularScore === 'number') {
          setRatingScore(infoData.spoonacularScore);
        }
      } catch (err) {
        console.error('Failed to fetch recipe details:', err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [item.id]);

  const renderStars = () => {
    const starCount = Math.round((ratingScore ?? 0) / 20);
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <MaterialIcons
            key={i}
            name={i < starCount ? 'star' : 'star-border'}
            size={18}
            color="gold"
          />
        ))}
      </>
    );
  };

  const renderScoreText = () => {
    const starCount = Math.round((ratingScore ?? 0) / 20);
    return (
      <Text style={recipeOverviewStyles.likesText}>
        {starCount}/5 Rating
      </Text>
    );
  };

  const onToggleLike = async () => {
    const minimal: FavoriteItem = {
      id: item.id,
      title: item.title,
      image: item.image,
      spoonacularScore: item.spoonacularScore ?? ratingScore ?? 0,
    };
    const nowLiked = await toggle(minimal);
    setLiked(nowLiked);
  };

  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={recipeOverviewStyles.background}
      resizeMode="cover"
    >
      <View style={recipeOverviewStyles.overlay} />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={recipeOverviewStyles.closeButton}
      >
        <MaterialIcons name="close" size={32} color="white" />
      </TouchableOpacity>

      <View style={recipeOverviewStyles.container}>
        <View style={recipeOverviewStyles.card}>
          {/* Header */}
          <View style={recipeOverviewStyles.rowBetween}>
            <View style={recipeOverviewStyles.titleWithFlex}>
              <Text
                style={recipeOverviewStyles.title}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </View>
            <TouchableOpacity onPress={onToggleLike}>
              <MaterialIcons
                name={liked ? 'favorite' : 'favorite-border'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Rating */}
          <View style={recipeOverviewStyles.rowCenter}>
            {renderStars()}
            {renderScoreText()}
          </View>

          {/* Tags */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={recipeOverviewStyles.tagsRow}
          >
            {tags.length > 0 && (
              <View style={recipeOverviewStyles.tagsRow}>
                {tags.map((tag, idx) => (
                  <Text key={idx} style={recipeOverviewStyles.tag}>{tag}</Text>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Description */}
          <ScrollView style={recipeOverviewStyles.descriptionContainer}>
            {summary ? (
              <ScrollView style={recipeOverviewStyles.descriptionContainer}>
                <Text style={recipeOverviewStyles.description}>
                  {summary.replace(/<\/?[^>]+(>|$)/g, '')}
                </Text>
              </ScrollView>
            ) : (
              <Text style={recipeOverviewStyles.placeholder}>Loading description...</Text>
            )}
          </ScrollView>

          {/* Buttons */}
          <TouchableOpacity
            style={recipeOverviewStyles.viewButton}
            onPress={() => navigation.navigate('RecipePage', { item, score: ratingScore ?? 0 })}
          >
            <Text style={recipeOverviewStyles.viewButtonText}>View Recipe Book</Text>
          </TouchableOpacity>

          <View style={recipeOverviewStyles.caloriesContainer}>
            <Text style={recipeOverviewStyles.caloriesContainerText}>
              {nutrition?.calories || '...'} Calories
            </Text>
          </View>

          {/* Share */}
          <View style={recipeOverviewStyles.rowEnd}>
            <View style={recipeOverviewStyles.iconButton}>
              <TouchableOpacity onPress={() => console.log('Recipe copied!')} style={recipeOverviewStyles.iconTouch}>
                <MaterialIcons name="content-copy" size={24} color="#444" />
              </TouchableOpacity>
              <Text style={recipeOverviewStyles.iconLabel}>Copy</Text>
            </View>

            <View style={recipeOverviewStyles.iconButton}>
              <TouchableOpacity onPress={() => console.log('Share?')} style={recipeOverviewStyles.iconTouch}>
                <MaterialIcons name="share" size={24} color="#444" />
              </TouchableOpacity>
              <Text style={recipeOverviewStyles.iconLabel}>Share</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RecipeOverviewScreen;
