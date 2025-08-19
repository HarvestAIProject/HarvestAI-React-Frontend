// src/pages/screens/Cart.tsx
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import cartStyles from '../../styles/cartStyles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

import type { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';

// Extend Product for cart usage
export type CartItem = Product & { quantity: number };

const extractCurrency = (price: string): string => {
  // examples supported: "5.99 USD", "12.50 SGD", "S$9.90", "$4.00", "4.00"
  if (/S\$/i.test(price)) return 'S$';
  if (/\bSGD\b/i.test(price)) return 'S$';
  if (/\bUSD\b/i.test(price)) return '$';
  if (/^\s*\$/i.test(price)) return '$';
  // default to S$ (tweak if you prefer something else)
  return 'S$';
};

const parsePriceValue = (price: string): number => {
  const match = price.replace(',', '').match(/([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : 0;
};

const currencyFmt = (symbol: string, n: number) => `${symbol}${n.toFixed(2)}`;

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, increment, decrement, remove } = useCart() as {
    items: CartItem[];
    increment: (id: string) => void;
    decrement: (id: string) => void;
    remove: (id: string) => void;
  };

  const { currencySymbol, subtotal, deliveryFee, total } = useMemo(() => {
    const symbol = items.length > 0 ? extractCurrency(items[0].price) : 'S$';
    const s = items.reduce((acc, it) => acc + parsePriceValue(it.price) * it.quantity, 0);
    const fee = items.length > 0 ? 3.5 : 0; // adjust logic as needed
    return { currencySymbol: symbol, subtotal: s, deliveryFee: fee, total: s + fee };
  }, [items]);

  const renderItem = ({ item }: { item: CartItem }) => {
    const unitValue = parsePriceValue(item.price);
    const lineTotal = unitValue * item.quantity;

    return (
      <View style={cartStyles.card}>
        <Image
          source={{ uri: item.imageUrl || undefined }}
          style={cartStyles.cardImage}
          // fallback: avoid RN warning if imageUrl is empty
          defaultSource={undefined as any}
        />
        <View style={cartStyles.cardContent}>
          <Text numberOfLines={2} style={cartStyles.cardTitle}>{item.title}</Text>
          <Text style={cartStyles.cardSubtitle}>{item.price}</Text>

          <View style={cartStyles.rowBetween}>
            <View style={cartStyles.qtyControls}>
              <TouchableOpacity
                onPress={() => decrement(item.id)}
                style={[cartStyles.qtyButton, item.quantity <= 1 && cartStyles.qtyButtonDisabled]}
                disabled={item.quantity <= 1}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="remove"
                  size={18}
                  color={item.quantity <= 1 ? '#9aa0a6' : '#111'}
                />
              </TouchableOpacity>

              <Text style={cartStyles.qtyText}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => increment(item.id)}
                style={cartStyles.qtyButton}
                activeOpacity={0.7}
              >
                <MaterialIcons name="add" size={18} color="#111" />
              </TouchableOpacity>
            </View>

            <Text style={cartStyles.lineTotal}>
              {currencyFmt(currencySymbol, lineTotal)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => remove(item.id)}
          style={cartStyles.removeBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons name="delete" size={22} color="#b00020" />
        </TouchableOpacity>
      </View>
    );
  };

  const empty = items.length === 0;

  return (
    <View style={cartStyles.container}>
      {/* Top Bar */}
      <View style={cartStyles.topBar}>
        <TouchableOpacity style={cartStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        <Text style={cartStyles.title}>Cart</Text>
      </View>

      {/* Empty state */}
      {empty ? (
        <View style={cartStyles.emptyWrap}>
          <MaterialIcons name="shopping-cart" size={64} color="#9aa0a6" />
          <Text style={cartStyles.emptyTitle}>Your cart is empty</Text>
          <Text style={cartStyles.emptySubtitle}>
            Browse the shop and add some ingredients!
          </Text>
          <TouchableOpacity
            style={cartStyles.shopBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={cartStyles.shopBtnText}>Go to Shop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(it) => String(it.id)}
            renderItem={renderItem}
            contentContainerStyle={cartStyles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Sticky Summary Bar */}
          <View style={cartStyles.summaryBar}>
            <View style={cartStyles.summaryRow}>
              <Text style={cartStyles.summaryLabel}>Subtotal</Text>
              <Text style={cartStyles.summaryValue}>
                {currencyFmt(currencySymbol, subtotal)}
              </Text>
            </View>
            <View style={cartStyles.summaryRow}>
              <Text style={cartStyles.summaryLabel}>Delivery</Text>
              <Text style={cartStyles.summaryValue}>
                {deliveryFee === 0 ? '—' : currencyFmt(currencySymbol, deliveryFee)}
              </Text>
            </View>
            <View style={cartStyles.summaryDivider} />
            <View style={cartStyles.summaryRow}>
              <Text style={cartStyles.summaryTotalLabel}>Total</Text>
              <Text style={cartStyles.summaryTotalValue}>
                {currencyFmt(currencySymbol, total)}
              </Text>
            </View>

            <TouchableOpacity
              style={[cartStyles.checkoutBtn, empty && cartStyles.checkoutBtnDisabled]}
              disabled={empty}
              activeOpacity={0.85}
            >
              <Text
                style={[cartStyles.checkoutText, empty && cartStyles.checkoutTextDisabled]}
              >
                Proceed to Checkout
              </Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={18}
                color={empty ? '#cfcfcf' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;
