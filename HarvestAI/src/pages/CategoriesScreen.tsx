import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import categoriesStyles from '../styles/categoriesStyles'; // Create this file if not done

const CategoriesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const categories = [
    { name: 'Asian', image: 'https://example.com/asian.jpg' },
    { name: 'Italian', image: 'https://example.com/italian.jpg' },
    { name: 'Mexican', image: 'https://example.com/mexican.jpg' },
  ];

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
        {categories.map((cat, idx) => (
          <TouchableOpacity key={idx} style={categoriesStyles.categoryRow}>
            <View style={categoriesStyles.rowContent}>
              <Image
                source={{ uri: cat.image }}
                style={categoriesStyles.categoryImage}
                resizeMode="cover"
              />
              <Text style={categoriesStyles.categoryText}>{cat.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;
