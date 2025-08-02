import { View, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Home from '../pages/screens/Home';
import Discover from '../pages/screens/Discover';
import Shop from '../pages/screens/Shop';
import Profile from '../pages/screens/Profile';
import layoutStyles from '../styles/layoutStyles';


const MainLayout = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<'Home' | 'Discover' | 'Shop' | 'You'>('Home');
  const [userName, setUserName] = useState('User');
  const [bio, setBio] = useState('Lover of noodles, spice & all things nice 🍜');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <Home />;
      case 'Discover': return <Discover />;
      case 'Shop': return <Shop />;
      case 'You': return (
        <Profile
          userName={userName}
          bio={bio}
          profileImage={profileImage}
          setUserName={setUserName}
          setBio={setBio}
          setProfileImage={setProfileImage}
        />
      );
      default: return null;
    }
  };

  return (
    <View style={layoutStyles.container}>
      {/* Always show TopBar unless you're navigating away via Stack */}
      <TopBar
        activeTab={activeTab}
        userName={userName}
        onFavouritesPress={() => navigation.navigate('Favourites')}
      />

      {/* Scrollable content for the current active tab */}
      <ScrollView contentContainerStyle={layoutStyles.scrollContent}>
        {renderContent()}
      </ScrollView>

      {/* BottomNav with camera + tab switching */}
      <BottomNav
        activeTab={activeTab}
        onTabPress={(tab) => {
          setActiveTab(tab);
        }}
        onCameraPress={() => {
          navigation.navigate('Camera');
        }}
      />
    </View>
  );
};

export default MainLayout;
