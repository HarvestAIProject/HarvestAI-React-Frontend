import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import shopStyles from '../../styles/shopStyles';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../api/shopApi';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const Shop = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const items = await fetchProducts();
        if (!ac.signal.aborted) setListings(items);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  const renderCard = ({ item }: { item: Product }) => (
    <TouchableOpacity style={shopStyles.card} onPress={() => navigation.navigate('Product', { product: item })}>
      <Image source={{ uri: item.imageUrl }} style={shopStyles.cardImage} />
      <View style={shopStyles.cardContent}>
        <Text style={shopStyles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={shopStyles.cardPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={shopStyles.container}>
      {loading ? (
        <View style={shopStyles.placeholderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : listings.length === 0 ? (
        <View style={shopStyles.placeholderContainer}>
          <Text style={shopStyles.placeholderTitle}>No Listings yet :(</Text>
          <Text style={shopStyles.placeholderSubtitle}>
            Come back soon to explore the variety of goods sold by our beloved vendors!
          </Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={shopStyles.row}
          contentContainerStyle={shopStyles.grid}
        />
      )}
    </View>
  );
};

export default Shop;
