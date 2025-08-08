import { View, ScrollView, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import resultsScreenStyles from '../styles/resultsScreenStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { ResultItem } from '../types/ResultItem';

const ResultsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Results'>>();
  const { results, title } = route.params;

  const renderCard = (item: ResultItem) => {

    return (
      <TouchableOpacity
        key={item.id}
        style={resultsScreenStyles.card}
        onPress={() => navigation.navigate('RecipeOverview', { item })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={resultsScreenStyles.image} />
        <View style={resultsScreenStyles.cardContent}>
          <Text style={resultsScreenStyles.cardTitle}>{item.title}</Text>
          <View style={resultsScreenStyles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <MaterialIcons
                key={i}
                name={i < Math.round((item.spoonacularScore ?? 0) / 20) ? 'star' : 'star-border'}
                size={18}
                color="gold"
                style={resultsScreenStyles.starIcon}
              />
            ))}
            <Text style={resultsScreenStyles.ratingText}>
              {Math.round((item.spoonacularScore ?? 0) / 20)}/5 Rating
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={resultsScreenStyles.container}>
      <View style={resultsScreenStyles.topBar}>
        <TouchableOpacity style={resultsScreenStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        <Text style={resultsScreenStyles.title}>{title ?? 'Results'}</Text>
      </View>

      <ScrollView contentContainerStyle={resultsScreenStyles.content}>
        {results.length > 0 ? (
          results.map(renderCard)
        ) : (
          <View style={resultsScreenStyles.emptyContainer}>
            <Text style={resultsScreenStyles.placeholderTitle}>No results found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ResultsScreen;
