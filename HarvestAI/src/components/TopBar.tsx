import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import topBarStyles from '../styles/topBarStyles';

type Props = {
  activeTab: 'Home' | 'Discover' | 'Shop' | 'You';
  userName: string;
  onFavouritesPress?: () => void;
};

const TopBar = ({ activeTab, userName, onFavouritesPress }: Props) => {

  if (activeTab === 'You') return null;

  return (
    <View style={topBarStyles.container}>
      {activeTab === 'Home' && (
        <View style={topBarStyles.headerRow}>
          <Text style={topBarStyles.greetingText}>What’s Cooking,{'\n'}{userName}</Text>
          <TouchableOpacity style={topBarStyles.heartButton} onPress={onFavouritesPress}>
            <FontAwesome name="heart" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      <View style={topBarStyles.searchBar}>
        <FontAwesome name="search" size={18} color="#6b7280" />
        <TextInput
          style={topBarStyles.searchInput}
          placeholder="Search for recipes & channels"
          placeholderTextColor="#6b7280"
        />
      </View>
    </View>
  );
};

export default TopBar;
