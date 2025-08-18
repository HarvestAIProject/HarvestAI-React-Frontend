import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import shopStyles from '../../styles/shopStyles';
import { Product } from '../../types/Product';

const Shop = () => {
  const [listings, setListings] = useState<Product[]>([]);

  const BASE_URL = process.env.BASE_URL;

  useEffect(() => {
    (async () => {
      try {
        if (!BASE_URL) {
          console.warn('BASE_URL is missing');
          return;
        }
        const res = await fetch(`${BASE_URL}/shop/products`);
        if (!res.ok) {
          console.warn('Fetch failed:', res.status, await res.text());
          return;
        }
        const data = await res.json();
        setListings(
          data.map((p: any) => ({
            id: p.ID,
            title: p.Title,
            description: p.Description,
            imageUrl: p.ImageURL,
            price: `${p.PriceAmount} ${p.Currency}`,
          }))
        );
      } catch (e) {
        console.error('Network error:', e);
      }
    })();
  }, [BASE_URL]);

  const renderCard = ({ item }: { item: Product }) => (
    <TouchableOpacity style={shopStyles.card}>
      <Image source={{ uri: item.imageUrl }} style={shopStyles.cardImage} />
      <Text style={shopStyles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={shopStyles.cardPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={shopStyles.container}>
      {listings.length === 0 ? (
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
