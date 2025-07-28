import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import recipePageStyles from '../styles/recipePageStyles';

const TABS = ['Ingredients', 'Preparation', 'Nutrition'];

const RecipePage =() => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipePage'>>();
  const { item } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('Ingredients');

  const dummyIngredients = [
    { id: '1', name: 'Cucumber', type: 'Fresh Vegetable', image: 'https://example.com/cucumber.jpg' },
    { id: '2', name: 'Soy Sauce', type: 'Condiment', image: 'https://example.com/soysauce.jpg' },
    { id: '3', name: 'Crushed Red Pepper', type: 'Seasoning', image: 'https://example.com/redpepper.jpg' },
    { id: '4', name: 'Sesame Oil', type: 'Condiment', image: 'https://example.com/sesameoil.jpg' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Ingredients':
        return (
          <FlatList
            data={dummyIngredients}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={recipePageStyles.cardGrid}
            renderItem={({ item }) => (
              <View style={recipePageStyles.card}>
                <ImageBackground
                  source={{ uri: item.image }}
                  style={recipePageStyles.cardImage}
                  imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                />
                <View style={recipePageStyles.cardTextContainer}>
                  <Text style={recipePageStyles.cardTitle}>{item.name}</Text>
                  <Text style={recipePageStyles.cardSubtitle}>{item.type}</Text>
                </View>
              </View>
            )}
          />
        );

      case 'Preparation':
        return (
          <View style={recipePageStyles.textContentContainer}>
            <Text style={recipePageStyles.textContent}>
              1. Wash and slice the vegetables.{"\n"}
              2. Prepare the bibimbap sauce.{"\n"}
              3. Sauté each vegetable individually.{"\n"}
              4. Fry the egg sunny-side-up.{"\n"}
              5. Assemble the bowl and top with sauce.
            </Text>
          </View>
        );

      case 'Nutrition':
        return (
          <View style={recipePageStyles.textContentContainer}>
            <Text style={recipePageStyles.textContent}>
              • Calories: 360 kcal{"\n"}
              • Carbs: 45g{"\n"}
              • Protein: 12g{"\n"}
              • Fat: 15g{"\n"}
              • Fiber: 6g
            </Text>
          </View>
        );

      default:
        return (
          <View style={recipePageStyles.placeholderContainer}>
            <Text style={recipePageStyles.placeholderText}>No content available.</Text>
          </View>
        );
    }
  };

  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={recipePageStyles.background}
      resizeMode="cover"
    >
      <View style={recipePageStyles.overlay} />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={recipePageStyles.backButton}
      >
        <MaterialIcons name="arrow-back-ios" size={32} color="white" />
      </TouchableOpacity>

      <View style={recipePageStyles.headerContainer}>
        {/* Title Row with Background */}
        <View style={recipePageStyles.titleRow}>
          <View style={recipePageStyles.titleWrapper}>
            <Text style={recipePageStyles.title}>{item.title}</Text>
          </View>

          <View style={recipePageStyles.iconGroup}>
            {[
              { icon: 'favorite-border', label: 'Like' },
              { icon: 'content-copy', label: 'Copy' },
              { icon: 'share', label: 'Share' },
            ].map(({ icon, label }) => (
              <View key={label} style={recipePageStyles.iconWrapper}>
                <MaterialIcons name={icon as any} size={24} color="white" />
                <Text style={recipePageStyles.iconLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Subtitle, Rating, Description */}
        <Text style={recipePageStyles.subtitle}>Recipe</Text>
        <View style={recipePageStyles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <MaterialIcons key={i} name="star" size={16} color="gold" />
          ))}
        </View>
        <Text style={recipePageStyles.description}>
          Bibimbap is one of the most well known Korean dishes. A rice bowl topped with all sorts
          of seasoned sautéed vegetables, marinated meat (usually beef), a fried egg sunny side
          up, finished with a sprinkle of sesame and generous dollop of a sweet-spicy-savoury
          Bibimbap sauce.
        </Text>
      </View>

      <View style={recipePageStyles.contentCard}>
        {/* Tabs */}
        <View style={recipePageStyles.tabRow}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[recipePageStyles.tabItem, activeTab === tab && recipePageStyles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={recipePageStyles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </View>
    </ImageBackground>
    
  );
}

export default RecipePage;