import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import shopStyles from '../../styles/shopStyles';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../api/shopApi';

const Shop = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await fetchProducts();
        if (!ac.signal.aborted) setListings(items);
      } catch (e: any) {
        if (!ac.signal.aborted) setError(e?.message ?? 'Failed to load products');
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  const renderCard = ({ item }: { item: Product }) => (
    <TouchableOpacity style={shopStyles.card}>
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
          <Text style={shopStyles.placeholderSubtitle}>Loading listings…</Text>
        </View>
      ) : error ? (
        <View style={shopStyles.placeholderContainer}>
          <Text style={shopStyles.placeholderTitle}>Error</Text>
          <Text style={shopStyles.placeholderSubtitle}>{error}</Text>
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
