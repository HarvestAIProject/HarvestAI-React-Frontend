import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import categoriesStyles from '../styles/categoriesStyles';
import { CategoryItem } from '../types/CategoryItem';
import { fetchCategories as fetchCategoriesAPI } from '../api/recipeApi';
import { fetchRecipesByCuisine } from '../api/recipeApi';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const data = await fetchCategoriesAPI();

      const parsed: CategoryItem[] = data.map((item: any) => ({
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
    fetchCategories();
  }, []);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={categoriesStyles.container}>
      {/* TopBar with Back Button and Title */}
      <View style={categoriesStyles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={categoriesStyles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        <Text style={categoriesStyles.title}>All Categories</Text>
      </View>

      {/* Categories Scrollable List */}
      <ScrollView contentContainerStyle={categoriesStyles.list}>
        {loadingCategories ? (
          <Text style={categoriesStyles.placeholder}>Loading...</Text>
        ) : categories.length === 0 ? (
          <Text style={categoriesStyles.placeholder}>No categories found</Text>
        ) : (
          categories.map((cat, idx) => (
            <TouchableOpacity
              key={idx}
              style={categoriesStyles.categoryRow}
              onPress={async () => {
                try {
                  const response = await fetchRecipesByCuisine(cat.name); // Create this API call
                  navigation.navigate('Results', { results: response, title: cat.name });
                } catch (err) {
                  console.error('Failed to fetch recipes by cuisine', err);
                }
              }}
            >
              <View style={categoriesStyles.rowContent}>
                <Image
                  source={{ uri: cat.image }}
                  style={categoriesStyles.categoryImage}
                  resizeMode="cover"
                />
                <Text style={categoriesStyles.categoryText}>{cat.name}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;
