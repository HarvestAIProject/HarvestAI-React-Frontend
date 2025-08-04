// RecipeOverviewScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import recipeOverviewStyles from '../styles/recipeOverviewStyles'; 

const RecipeOverviewScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipeOverview'>>();
  const { item } = route.params;

  const [liked, setLiked] = useState(false);

  const [nutrition, setNutrition] = useState<any>(null);
  const [summary, setSummary] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`http://172.20.10.4:8080/info?id=${item.id}`);
        const data = await res.json();
        setTags([
          ...(data.dishTypes || []),
          ...(data.cuisines || []),
        ]);
      } catch (e) {
        console.error("Failed to fetch tags", e);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [nutRes, sumRes, infoRes] = await Promise.all([
          fetch(`http://172.20.10.4:8080/nutrition?id=${item.id}`),
          fetch(`http://172.20.10.4:8080/summary?id=${item.id}`),
          fetch(`http://172.20.10.4:8080/info?id=${item.id}`),
        ]);
        const nutData = await nutRes.json();
        const sumData = await sumRes.json();
        const infoData = await infoRes.json();

        setNutrition(nutData);
        setSummary(sumData.summary); // Comes in HTML form
        setScore(infoData.spoonacularScore);
      } catch (err) {
        console.error('Failed to fetch recipe details:', err);
      }
    };

    fetchDetails();
  }, []);

  const renderStars = () => {
    if (score === null) return null;
    const starCount = Math.round(score / 20); // spoonacularScore out of 100
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
    if (score === null) return null;
    const starCount = Math.round(score / 20); // 100 max → 5 stars
    return (
      <Text style={recipeOverviewStyles.likesText}>
        {starCount}/5 Rating
      </Text>
    );
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
            <TouchableOpacity onPress={() => setLiked(!liked)}>
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
            style={recipeOverviewStyles.tagsRow}>
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
                  {summary.replace(/<\/?[^>]+(>|$)/g, '')} {/* Strip HTML tags */}
                </Text>
              </ScrollView>
            ) : (
              <Text style={recipeOverviewStyles.placeholder}>Loading description...</Text>
            )}
          </ScrollView>

          {/* Buttons */}
          <TouchableOpacity
            style={recipeOverviewStyles.viewButton}
            onPress={() => navigation.navigate('RecipePage', { item })}
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
