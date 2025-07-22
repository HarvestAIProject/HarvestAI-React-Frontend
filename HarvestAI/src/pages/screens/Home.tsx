import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import homeStyles from '../../styles/homeStyles';

const Home = () => {

  const [activeMeal, setActiveMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('lunch');

  const dishesByMeal = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  const categories = [];

  const handleSeeAllCategories = () => {

  };

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
        {dishesByMeal[activeMeal].length === 0 ? (
          <Text style={homeStyles.placeholder}>No dishes found</Text>
        ) : (
          // Render actual dishes here
          <View>{/* Your FlatList or dish cards */}</View>
        )}
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
