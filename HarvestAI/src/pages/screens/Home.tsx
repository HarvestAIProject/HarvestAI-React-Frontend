import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { ResultItem } from '../../types/ResultItem';

import homeStyles from '../../styles/homeStyles';

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

  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleDotPress = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * 266,
      animated: true,
    });
  };

  const categories = [];

  const handleSeeAllCategories = () => {
    navigation.navigate('Categories');
  };

  const fetchDishesByMeal = async (meal: 'breakfast' | 'lunch' | 'dinner') => {
    setLoading(true);
    try {
      const res = await fetch(`http://172.20.10.4:8080/popular?meal=${meal}`);
      const data = await res.json();
      
      setDishesByMeal((prev) => ({
        ...prev,
        [meal]: data.results || data,
      }));
    } catch (err) {
      console.error(`Failed to fetch ${meal} recipes`, err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dishesByMeal[activeMeal].length === 0) {
      fetchDishesByMeal(activeMeal);
    }
  }, [activeMeal]);


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
    <ScrollView style={homeStyles.container}>

      {/* Meal Tabs */}
      <View style={homeStyles.mealTabs}>
        {renderMealTab('breakfast')}
        {renderMealTab('lunch')}
        {renderMealTab('dinner')}
      </View>

      {/* Popular Dishes Section */}
      <Text style={homeStyles.sectionTitle}>POPULAR DISHES OF THE WEEK</Text>
      <View style={homeStyles.dishSection}>
        {loading ? (
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
              const index = Math.round(offsetX / 266); // 266 is your card width
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
                    <Text style={homeStyles.cardLink}>Recipe</Text>
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
        {categories.length === 0 ? (
          <Text style={homeStyles.placeholder}>No categories found</Text>
        ) : (
          // Render actual categories here
          <View>{/* Your category list */}</View>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
