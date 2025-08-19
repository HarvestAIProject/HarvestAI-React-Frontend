import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import topBarStyles from '../styles/topBarStyles';
import { useUser } from "@clerk/clerk-expo";
import { useCart } from '../context/CartContext';

type Props = {
  activeTab: 'Home' | 'Discover' | 'Shop' | 'You';
  onFavouritesPress?: () => void;
  onCartPress?: () => void;
};

type MyMeta = { displayName?: string };

const TopBar = ({ activeTab, onFavouritesPress, onCartPress }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useUser();
  const { totalQuantity } = useCart();

  if (activeTab === 'You') return null;

  const meta = (user?.unsafeMetadata as MyMeta) || {};
  const displayName = meta.displayName || user?.fullName || user?.firstName || 'Chef';

  return (
    <View style={topBarStyles.container}>
      {activeTab === 'Home' && (
        <View style={topBarStyles.headerRow}>
          <Text style={topBarStyles.greetingText}>
            What’s Cooking,{'\n'}{displayName}
          </Text>
          <TouchableOpacity style={topBarStyles.heartButton} onPress={onFavouritesPress}>
            <FontAwesome name="heart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {activeTab === 'Shop' ? (
        <View style={topBarStyles.headerRow}>
          <Text style={topBarStyles.shopTitle}>Shop</Text>
          <TouchableOpacity
            style={topBarStyles.cartButton}
            onPress={onCartPress}
          >
            <FontAwesome name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={topBarStyles.searchBar}
          activeOpacity={1}
          onPress={() => navigation.navigate('Search')}
        >
          <FontAwesome name="search" size={18} color="#6b7280" />
          <Text style={topBarStyles.searchPlaceholder}>Search recipes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopBar;
