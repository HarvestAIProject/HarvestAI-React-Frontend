import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import shopStyles from '../../styles/shopStyles';
import type { Product } from '../../types/Product';
import { fetchProducts, searchProducts } from '../../api/shopApi';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';

const Shop = () => {
  const [all, setAll] = useState<Product[]>([]);
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // initial load
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const items = await fetchProducts(ac.signal);
        setAll(items);
        setListings(items);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // server-side search with debounce
  useEffect(() => {
    // clear previous timers/requests
    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    const needle = q.trim();
    if (needle.length < 2) {
      setListings(all); // fallback to full list for short/empty queries
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const ac = new AbortController();
      abortRef.current = ac;
      try {
        const results = await searchProducts(needle, ac.signal);
        setListings(results);
      } catch {
        // optional: show an error state; here we just keep current listings
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, [q, all]);

  const renderCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={shopStyles.card}
      activeOpacity={0.85}
      onPress={() => nav.navigate('Product', { product: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={shopStyles.cardImage} />
      <View style={shopStyles.cardContent}>
        <Text style={shopStyles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={shopStyles.cardPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={shopStyles.container}>
      {/* Persistent search bar */}
      <View style={shopStyles.searchWrap}>
        <View style={shopStyles.searchBar}>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search products"
            placeholderTextColor="#9aa0a6"
            style={shopStyles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {q.length > 0 && (
            <TouchableOpacity onPress={() => setQ('')} style={shopStyles.clearBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={shopStyles.clearBtnText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={shopStyles.placeholderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : listings.length === 0 ? (
        <View style={shopStyles.placeholderContainer}>
          {q.trim().length >= 2 ? (
            <>
              <MaterialIcons name="search-off" size={64} color="#9aa0a6" />
              <Text style={shopStyles.placeholderTitle}>No results found</Text>
              <Text style={shopStyles.placeholderSubtitle}>
                Try a different keyword for “{q}”.
              </Text>
            </>
          ) : (
            <>
              <MaterialIcons name="shopping-cart" size={64} color="#9aa0a6" />
              <Text style={shopStyles.placeholderTitle}>No listings available</Text>
              <Text style={shopStyles.placeholderSubtitle}>
                Please check back later.
              </Text>
            </>
          )}
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={shopStyles.row}
          contentContainerStyle={shopStyles.grid}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

export default Shop;
