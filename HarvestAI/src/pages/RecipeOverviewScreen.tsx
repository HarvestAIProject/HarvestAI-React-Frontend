// RecipeOverviewScreen.tsx
import React, { useState } from 'react';
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            {[...Array(5)].map((_, index) => (
              <MaterialIcons key={index} name="star" size={18} color="gold" />
            ))}
            <Text style={recipeOverviewStyles.likesText}>{item.likes} people liked this</Text>
          </View>

          {/* Tags */}
          <View style={recipeOverviewStyles.tagsRow}>
            <Text style={recipeOverviewStyles.tag}>Korean</Text>
            <Text style={recipeOverviewStyles.tag}>Healthy</Text>
          </View>

          {/* Description */}
          <ScrollView style={recipeOverviewStyles.descriptionContainer}>
            <Text style={recipeOverviewStyles.description}>
              Bibimbap is one of the most well known Korean dishes. A rice bowl topped with all sorts
              of seasoned sautéed vegetables, marinated meat (usually beef), a fried egg sunny side
              up, finished with a sprinkle of sesame and generous dollop of a sweet-spicy-savoury
              Bibimbap sauce.
            </Text>
          </ScrollView>

          {/* Buttons */}
          <TouchableOpacity
            style={recipeOverviewStyles.viewButton}
            onPress={() => navigation.navigate('RecipePage', { item })}
          >
            <Text style={recipeOverviewStyles.viewButtonText}>View Recipe Book</Text>
          </TouchableOpacity>

          <View style={recipeOverviewStyles.caloriesContainer}>
            <Text style={recipeOverviewStyles.caloriesContainerText}>360 Calories</Text>
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
