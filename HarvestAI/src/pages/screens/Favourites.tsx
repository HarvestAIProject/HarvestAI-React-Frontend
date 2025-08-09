import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import favouritesStyles from '../../styles/favouritesStyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { useFavorites } from '../../context/FavoritesContext';
import type { FavoriteItem } from '../../types/FavoriteItem';

const Favourites = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { favorites } = useFavorites();

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <TouchableOpacity
      style={favouritesStyles.card}
      onPress={() => navigation.navigate('RecipeOverview', { item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={favouritesStyles.cardImage} />
      
      <View style={favouritesStyles.cardContent}>
        <Text numberOfLines={2} style={favouritesStyles.cardTitle}>
          {item.title}
        </Text>
        <View style={favouritesStyles.cardDivider} />
        <Text style={favouritesStyles.subtitle}>Recipe</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={favouritesStyles.container}>
      <View style={favouritesStyles.topBar}>
        <TouchableOpacity style={favouritesStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        <Text style={favouritesStyles.title}>Favourites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={favouritesStyles.content}>
          <Text style={favouritesStyles.placeholderText}>
            Looks like your favourites list is empty!
          </Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={favouritesStyles.listContent}
          data={favorites}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Favourites;
