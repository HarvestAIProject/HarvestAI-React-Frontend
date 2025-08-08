import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ResultItem } from '../types/ResultItem';
import styles from '../styles/resultsOverlayStyles';

type Props = {
  results: ResultItem[];
  onClose: () => void;
  visible: boolean;
  onCloseComplete: () => void;
};

const ResultsOverlay = ({ results, onClose, visible, onCloseComplete }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '90%'], []);

  const [activeTab, setActiveTab] = useState<'recipes' | 'shop'>('recipes');

  useEffect(() => {
    if (!sheetRef.current) return;
    if (visible) {
      sheetRef.current.expand();
    } else {
      sheetRef.current.close(); // imperative close
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      onChange={(index) => {
        if (index === -1) {
          onCloseComplete(); // overlay fully closed
        }
      }}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Image Results</Text>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={styles.tabHalf}
            onPress={() => setActiveTab('recipes')}
            activeOpacity={0.7}
          >
            <Text style={activeTab === 'recipes' ? styles.activeTab : styles.inactiveTab}>Recipes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabHalf}
            onPress={() => setActiveTab('shop')}
            activeOpacity={0.7}
          >
            <Text style={activeTab === 'shop' ? styles.activeTab : styles.inactiveTab}>Shop</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabUnderlineWrapper}>
          <View
            style={[
              styles.tabUnderline,
              activeTab === 'recipes' ? styles.leftUnderline : styles.rightUnderline,
            ]}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.content}>
          {activeTab === 'recipes' ? (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#aaa', fontSize: 16 }}>No results found.</Text>
                </View>
              }
              ListFooterComponent={
                results.length > 0 ? (
                  <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ color: '#aaa', fontSize: 16 }}>All Recipes are displayed.</Text>
                  </View>
                ) : null
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RecipeOverview', { item });
                    }}
                    activeOpacity={0.8}
                  >
                  <View style={styles.card}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>{item.title}</Text>

                      <View style={styles.ratingRow}>
                        {Array.from({ length: 5 }).map((_, index) => {
                          const score = item.spoonacularScore ?? 0;
                          const diff = score / 20 - index;
                          let iconName: 'star' | 'star-half' | 'star-border' = 'star-border';
                          if (diff >= 1) iconName = 'star';
                          else if (diff >= 0.5) iconName = 'star-half';

                          return (
                            <MaterialIcons
                              key={index}
                              name={iconName}
                              size={18}
                              color="gold"
                              style={styles.starIcon}
                            />
                          );
                        })}
                        <Text style={styles.ratingText}>
                          {(item.spoonacularScore ?? 0 / 20).toFixed(1)}
                        </Text>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#aaa', fontSize: 16 }}>No results found.</Text>
            </View>
          )}
        </View>
        
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ResultsOverlay;
