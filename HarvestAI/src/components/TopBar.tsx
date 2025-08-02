import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import topBarStyles from '../styles/topBarStyles';

type Props = {
  activeTab: 'Home' | 'Discover' | 'Shop' | 'You';
  userName: string;
  onFavouritesPress?: () => void;
};

const TopBar = ({ activeTab, userName, onFavouritesPress }: Props) => {

  if (activeTab === 'You') return null;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={topBarStyles.container}>
      {activeTab === 'Home' && (
        <View style={topBarStyles.headerRow}>
          <Text style={topBarStyles.greetingText}>What’s Cooking,{'\n'}{userName}</Text>
          <TouchableOpacity style={topBarStyles.heartButton} onPress={onFavouritesPress}>
            <FontAwesome name="heart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={topBarStyles.searchBar}
        activeOpacity={1}
        onPress={() => navigation.navigate('Search')}
      >
        <FontAwesome name="search" size={18} color="#6b7280" />
        <Text style={topBarStyles.searchPlaceholder}>Search recipes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
