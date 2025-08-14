import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import topBarStyles from '../styles/topBarStyles';
import { useAuth } from "../context/AuthContext";

type Props = {
  activeTab: 'Home' | 'Discover' | 'Shop' | 'You';
  onFavouritesPress?: () => void;
};

const TopBar = ({ activeTab, onFavouritesPress }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, logout } = useAuth();

  // Add debugging
  console.log('TopBar rendered with user:', user?.email || 'No user');

  if (activeTab === 'You') return null;

  // Extract display name from Firebase user
  const getDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) {
      // Extract name from email (before @)
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'Chef';
  };

  const handleSignOut = () => {
    console.log('Sign out button pressed'); // Add this
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Sign out canceled'),
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            console.log('User confirmed sign out'); // Add this
            try {
              console.log('Calling logout function...');
              await logout();
              console.log('Logout function completed');
            } catch (error) {
              console.error('Sign out error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const displayName = getDisplayName();

  return (
    <View style={topBarStyles.container}>
      {activeTab === 'Home' && (
        <View style={topBarStyles.headerRow}>
          <Text style={topBarStyles.greetingText}>What's Cooking,{'\n'}{displayName}</Text>
          <View style={topBarStyles.rightButtons}>
            <TouchableOpacity style={topBarStyles.heartButton} onPress={onFavouritesPress}>
              <FontAwesome name="heart" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={topBarStyles.signOutButton} 
              onPress={handleSignOut}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Make it easier to tap
            >
              <FontAwesome name="sign-out" size={20} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
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
