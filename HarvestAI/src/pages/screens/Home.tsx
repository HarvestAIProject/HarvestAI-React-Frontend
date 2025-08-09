import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { ResultItem } from '../../types/ResultItem';
import { CategoryItem } from '../../types/CategoryItem';
import homeStyles from '../../styles/homeStyles';
import {
  fetchCategories as fetchCategoriesAPI,
  fetchPopularRecipes as fetchPopularRecipesAPI,
  fetchRecipesByCuisine as fetchRecipesByCuisineAPI
} from '../../api/recipeApi';

const Home = () => {

  const [activeMeal, setActiveMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('lunch');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [dishesByMeal, setDishesByMeal] = useState<{
    breakfast: ResultItem[];
    lunch: ResultItem[];
    dinner: ResultItem[];
  }>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingMeals, setLoadingMeals] = useState<{ [key in 'breakfast' | 'lunch' | 'dinner']?: boolean }>({});

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleDotPress = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * 266,
      animated: true,
    });
  };

  const handleSeeAllCategories = () => {
    navigation.navigate('Categories');
  };

  const fetchDishesByMeal = async (meal: 'breakfast' | 'lunch' | 'dinner') => {
    setLoadingMeals(prev => ({ ...prev, [meal]: true }));
    try {
      const data = await fetchPopularRecipesAPI(meal);
      setDishesByMeal((prev) => ({
        ...prev,
        [meal]: data.results || data,
      }));
    } catch (err) {
      console.error(`Failed to fetch ${meal} recipes`, err);
    }
    setLoadingMeals(prev => ({ ...prev, [meal]: false }));
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const data = await fetchCategoriesAPI();

      const parsed: CategoryItem[] = data.slice(0, 3).map((item: any) => ({
        name: item.name,
        image: item.image,
      }));

      setCategories(parsed);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
    setLoadingCategories(false);
  };


  useEffect(() => {
    if (dishesByMeal[activeMeal].length === 0) {
      fetchDishesByMeal(activeMeal);
    }
  }, [activeMeal]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderMealTab = (meal: 'breakfast' | 'lunch' | 'dinner') => {

    const isActive = activeMeal === meal;

    return (
      <TouchableOpacity
        key={meal}
        onPress={() => setActiveMeal(meal)}
        style={[
          homeStyles.mealTab,
          isActive && homeStyles.mealTabActive
        ]}
      >
        <Text
          style={[
            homeStyles.mealTabText,
            isActive && homeStyles.mealTabTextActive
          ]}
        >
          {meal.charAt(0).toUpperCase() + meal.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={homeStyles.container}>

      {/* Meal Tabs */}
      <View style={homeStyles.mealTabs}>
        {renderMealTab('breakfast')}
        {renderMealTab('lunch')}
        {renderMealTab('dinner')}
      </View>
      <ScrollView>
        {/* Popular Dishes Section */}
        <Text style={homeStyles.sectionTitle}>POPULAR DISHES OF THE WEEK</Text>
        <View style={homeStyles.dishSection}>
          {loadingMeals[activeMeal] ? (
            <Text style={homeStyles.placeholder}>Loading...</Text>
          ) : dishesByMeal[activeMeal].length === 0 ? (
            <Text style={homeStyles.placeholder}>No {activeMeal} dishes found</Text>
          ) : (
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / 266);
                setActiveIndex(index);
              }}
            >
              {dishesByMeal[activeMeal].map((dish) => (
                <TouchableOpacity
                  key={dish.id}
                  style={homeStyles.dishCard}
                  onPress={() => navigation.navigate('RecipeOverview', { item: dish })}
                >
                  <View style={homeStyles.dishRow}>
                    <Image source={{ uri: dish.image }} style={homeStyles.cardImage} />
                    <View style={homeStyles.cardInfo}>
                      <Text style={homeStyles.cardTitle} numberOfLines={2}>{dish.title}</Text>
                      <View style={homeStyles.cardDivider} />
                      <Text style={homeStyles.subtitle}>Recipe</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <View style={homeStyles.indicatorContainer}>
            {dishesByMeal[activeMeal].map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleDotPress(i)}
                style={[
                  homeStyles.indicatorDot,
                  i === activeIndex && homeStyles.activeDot
                ]}
              />
            ))}
          </View>
        </View>

        {/* Category Section */}
        <View style={homeStyles.categoryHeader}>
          <Text style={homeStyles.sectionTitle}>CATEGORIES</Text>
          <TouchableOpacity onPress={handleSeeAllCategories}>
            <Text style={homeStyles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={homeStyles.categorySection}>
          {loadingCategories ? (
            <Text style={homeStyles.placeholder}>Loading...</Text>
          ) : categories.length === 0 ? (
            <Text style={homeStyles.placeholder}>No categories found</Text>
          ) : (
            categories.map((cat, idx) => (
              <TouchableOpacity
                key={idx}
                style={homeStyles.categoryButton}
                onPress={async () => {
                  try {
                    const response = await fetchRecipesByCuisineAPI(cat.name);
                    navigation.navigate('CategoriesResults', {
                      results: response.results || response, // depends on your backend shape
                      title: cat.name
                    });
                  } catch (err) {
                    console.error('Failed to fetch recipes for category:', cat.name, err);
                  }
                }}
              >
                <View style={homeStyles.categoryRow}>
                  <Image source={{ uri: cat.image }} style={homeStyles.categoryCardImage} resizeMode="cover" />
                  <View style={homeStyles.cardInfo}>
                    <Text style={homeStyles.categoryText}>{cat.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
