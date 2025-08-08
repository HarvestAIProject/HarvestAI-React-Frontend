import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import recipePageStyles from '../styles/recipePageStyles';
import { fetchRecipeInfo, fetchRecipeNutrition } from '../api/recipeApi';

const TABS = ['Ingredients', 'Preparation', 'Nutrition'];

const RecipePage = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipePage'>>();
  const { item, score } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('Ingredients');
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const snapPoints = useMemo(() => ['30%', '85%'], []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await fetchRecipeInfo(item.id);           // /info?id={id}
        const nutrition = await fetchRecipeNutrition(item.id); // /nutrition?id={id}

        setInfo({ ...data, nutrition }); // merge both
      } catch (err) {
        console.error('Failed to fetch recipe info', err);
      }
      setLoading(false);
    };

    fetchInfo();
  }, []);

  const renderFlatListContent = () => {
    if (activeTab === 'Ingredients') {
      return {
        data: info?.extendedIngredients || [],
        keyExtractor: (item: any) => item.id.toString(),
        numColumns: 2,
        renderItem: ({ item }: any) => (
          <View style={recipePageStyles.card}>
            <ImageBackground
              source={{ uri: `https://spoonacular.com/cdn/ingredients_250x250/${item.image}` }}
              style={recipePageStyles.cardImage}
              imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            />
            <View style={recipePageStyles.cardTextContainer}>
              <Text style={recipePageStyles.cardTitle}>{item.name}</Text>
              <Text style={recipePageStyles.cardSubtitle}>{item.aisle}</Text>
            </View>
          </View>
        ),
        ListEmptyComponent: () => (
          <View style={recipePageStyles.placeholderContainer}>
            <Text style={recipePageStyles.placeholderText}>
              No ingredients found.
            </Text>
          </View>
        ),
      };
    }

    if (activeTab === 'Preparation') {
      const steps: string[] =
        info?.instructions
          ?.replace(/<\/?[^>]+(>|$)/g, '')
          ?.split('.')
          ?.map((s: string) => s.trim())
          ?.filter((s: string) => s.length > 0) || [];

      return {
        data: steps,
        keyExtractor: (_: string, index: number) => index.toString(),
        renderItem: ({ item, index }: { item: string; index: number }) => (
          <View style={recipePageStyles.stepItem}>
            <Text style={recipePageStyles.stepNumber}>{index + 1}.</Text>
            <Text style={recipePageStyles.stepText}>{item}.</Text>
          </View>
        ),
        ListEmptyComponent: () => (
          <View style={recipePageStyles.placeholderContainer}>            
            <Text style={recipePageStyles.placeholderText}>
              No preparation steps found.
            </Text>
          </View>
        ),
      };
    }

    return null;
  };

  if (loading || !info) {
    return (
      <View style={recipePageStyles.loadingContainer}>
        <Text style={recipePageStyles.placeholderText}>Loading recipe...</Text>
      </View>
    );
  }

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

        <Text style={recipePageStyles.subtitle}>Recipe</Text>
        <View style={recipePageStyles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <MaterialIcons
              key={i}
              name={i < Math.round((score ?? 0) / 20) ? 'star' : 'star-border'}
              size={16}
              color="gold"
            />
          ))}
          <Text style={recipePageStyles.ratingText}>
            {Math.round((score ?? 0) / 20)}/5 Rating
          </Text>
        </View>

        <View style={recipePageStyles.descriptionContainer}>
          <ScrollView
            showsVerticalScrollIndicator={true}
          >
            <Text style={recipePageStyles.description}>
              {info?.summary
                ? info.summary.replace(/<\/?[^>]+(>|$)/g, '')
                : 'No description available.'}
            </Text>
          </ScrollView>
        </View>
      </View>

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: 'white', borderRadius: 24 }}
      >
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

        {(() => {
          const flatListProps = renderFlatListContent();

          if (flatListProps) {
            return (
              <BottomSheetFlatList
                key={activeTab}
                {...flatListProps}
                contentContainerStyle={recipePageStyles.cardGrid}
              />
            );
          }

          return (
            <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
              <View style={recipePageStyles.stepList}>
                {info?.nutrition?.nutrients?.length > 0 ? (
                  info.nutrition.nutrients.map(
                    (n: { name: string; amount: number; unit: string }, index: number) => (
                      <View key={index} style={recipePageStyles.stepItem}>
                        <Text style={[recipePageStyles.stepNumber, { color: 'green' }]}>•</Text>
                        <Text style={recipePageStyles.stepText}>
                          {n.name}: {n.amount}{n.unit}
                        </Text>
                      </View>
                    )
                  )
                ) : (
                  <Text style={recipePageStyles.placeholderText}>
                    No nutrition information available.
                  </Text>
                )}
              </View>
            </BottomSheetScrollView>
          );
        })()}

      </BottomSheet>
    </ImageBackground>
  );
};

export default RecipePage;
