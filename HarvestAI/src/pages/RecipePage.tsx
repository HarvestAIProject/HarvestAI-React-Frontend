import React, { useState, useEffect } from 'react';
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

  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`http://172.20.10.4:8080/info?id=${item.id}`);
        const data = await res.json();
        setInfo(data);
      } catch (err) {
        console.error('Failed to fetch recipe info', err);
      }
      setLoading(false);
    };

    fetchInfo();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Ingredients':
        return (
          <FlatList
            data={info?.extendedIngredients || []}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={recipePageStyles.cardGrid}
            renderItem={({ item }) => (
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
            )}
          />
        );

        case 'Preparation':
          const steps: string[] =
            info?.instructions
              ?.replace(/<\/?[^>]+(>|$)/g, '') // remove HTML tags
              ?.split('.')
              ?.map((s: string) => s.trim())
              ?.filter((s: string) => s.length > 0) || [];

          return (
            <View style={recipePageStyles.textContentContainer}>
              <Text style={recipePageStyles.textContentTitle}>Instructions</Text>
              <FlatList
                data={steps}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={recipePageStyles.stepItem}>
                    <Text style={recipePageStyles.stepNumber}>{index + 1}.</Text>
                    <Text style={recipePageStyles.stepText}>{item}.</Text>
                  </View>
                )}
              />
            </View>
          );

        case 'Nutrition':
          return (
            <View style={recipePageStyles.textContentContainer}>
              <Text style={recipePageStyles.textContent}>
                {info?.nutrition?.nutrients
                  ?.slice(0, 5)
                  ?.map((n: { name: string; amount: number; unit: string }) => `• ${n.name}: ${n.amount}${n.unit}`)
                  ?.join('\n') || 'No nutrition information available.'}
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
          {info?.summary ? info.summary.replace(/<\/?[^>]+(>|$)/g, '') : 'No description available.'}
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