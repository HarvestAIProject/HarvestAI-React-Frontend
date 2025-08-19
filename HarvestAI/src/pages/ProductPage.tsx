// src/pages/screens/Product.tsx
import React, { useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useCart } from '../context/CartContext';
import styles from '../styles/productStyles';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

// helpers to format like your Cart
const parsePriceValue = (price: string) => {
  const m = price.replace(',', '').match(/([0-9]+(?:\.[0-9]+)?)/);
  return m ? Number(m[1]) : 0;
};
const currencySymbol = (price: string) =>
  /S\$/i.test(price) || /\bSGD\b/i.test(price)
    ? 'S$'
    : /^\s*\$|\bUSD\b/i.test(price)
    ? '$'
    : 'S$';
const fmt = (sym: string, n: number) => `${sym}${n.toFixed(2)}`;

const { width } = Dimensions.get('window');

const ProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;
  const gallery: string[] = useMemo(() => {
    const g = product.imageUrls && product.imageUrls.length ? product.imageUrls : [];
    return g.length ? g : (product.imageUrl ? [product.imageUrl] : []);
    }, [product.imageUrls, product.imageUrl]);
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const listRef = useRef<FlatList<string>>(null);

  const { add } = useCart();

    const handleAddToCart = async () => {
    try {
        await add(product, qty);
        // await Haptics.selectionAsync(); // optional
        Toast.show({
        type: 'success',
        text1: 'Added to cart',
        text2: `${qty} × ${product.title}`,
        });
    } catch {
        Toast.show({
        type: 'error',
        text1: 'Could not add to cart',
        text2: 'Please try again.',
        });
    }
    };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigation.navigate('Cart');
  };

  const sym = useMemo(() => currencySymbol(product.price), [product.price]);
  const unit = useMemo(() => parsePriceValue(product.price), [product.price]);
  const line = unit * qty;

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(i);
  };

  const go = (dir: -1 | 1) => {
    const next = Math.min(Math.max(index + dir, 0), Math.max(gallery.length - 1, 0));
    if (next !== index) {
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#111" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {/* Image gallery */}
        <View style={styles.galleryWrap}>
          {gallery.length > 0 ? (
            <>
              <FlatList
                ref={listRef}
                data={gallery}
                keyExtractor={(u, i) => `${u}-${i}`}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={[styles.heroImage, { width }]}
                    resizeMode="contain"
                  />
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onMomentumEnd}
              />
              <View style={styles.pagerOverlay}>
                <TouchableOpacity onPress={() => go(-1)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.pagerArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.pagerText}>
                  {gallery.length > 0 ? index + 1 : 0}/{gallery.length || 0}
                </Text>
                <TouchableOpacity onPress={() => go(1)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.pagerArrow}>›</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={[styles.imageFallback, { width }]}>
              <Text style={{ color: '#999' }}>No image</Text>
            </View>
          )}
        </View>

        {/* Meta */}
        <View style={styles.metaBlock}>
          {/* Brand line (optional) */}
          <Text style={styles.brandLabel}>HARVESTMART</Text>

          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.priceText}>{product.price}</Text>
        </View>

        {/* Quantity */}
        <View style={styles.qtyBlock}>
          <Text style={styles.sectionLabel}>Quantity</Text>
          <View style={styles.qtyControls}>
            <TouchableOpacity
              style={[styles.qtyBtn, qty <= 1 && styles.qtyBtnDisabled]}
              disabled={qty <= 1}
              onPress={() => setQty(q => Math.max(1, q - 1))}
              activeOpacity={0.7}
            >
              <MaterialIcons name="remove" size={18} color={qty <= 1 ? '#9aa0a6' : '#111'} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(q => q + 1)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="add" size={18} color="#111" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Totals (optional but handy) */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{fmt(sym, line)}</Text>
        </View>

        {/* CTAs */}
        <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={handleAddToCart}
        >
        <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.buyNowBtn}
            onPress={handleBuyNow}
        >
        <Text style={styles.buyNowText}>Buy it now</Text>
        </TouchableOpacity>


        {product.description ? (
          <View style={{ margin: 18 }}>
            <Text style={styles.sectionLabel}>Details</Text>
            <Text style={styles.descText}>{product.description}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
