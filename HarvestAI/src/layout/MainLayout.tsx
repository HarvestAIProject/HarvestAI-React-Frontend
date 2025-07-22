import { View, ScrollView } from 'react-native';
import { useState } from 'react';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Home from '../pages/screens/Home';
import Discover from '../pages/screens/Discover';
import Shop from '../pages/screens/Shop';
import Profile from '../pages/screens/Profile';
import CameraScreen from '../pages/CameraScreen';
import layoutStyles from '../styles/layoutStyles';
import Favourites from '../pages/screens/Favourites';

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Discover' | 'Shop' | 'You'>('Home');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [userName, setUserName] = useState('User');
  const [bio, setBio] = useState('Lover of noodles, spice & all things nice 🍜');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <Home />;
      case 'Discover': return <Discover />;
      case 'Shop': return <Shop />;
      case 'You': return <Profile userName={userName} bio={bio} profileImage={profileImage} setUserName={setUserName} setBio={setBio} setProfileImage={setProfileImage}/>;
      default: return null;
    }
  };

  return (
    <View style={layoutStyles.container}>
      {!isCameraOpen && !showFavourites && (
        <TopBar
          activeTab={activeTab}
          userName={userName}
          onFavouritesPress={() => setShowFavourites(true)}
        />
      )}

      {isCameraOpen ? (
        <CameraScreen onClose={() => setIsCameraOpen(false)} />
      ) : showFavourites ? (
        <>
          <Favourites onBack={() => setShowFavourites(false)} />
        </>
      ) : (
        <>
          <ScrollView contentContainerStyle={layoutStyles.scrollContent}>
            {renderContent()}
          </ScrollView>
          <BottomNav
            activeTab={activeTab}
            onTabPress={(tab) => {
              setActiveTab(tab);
              setShowFavourites(false);
            }}
            onCameraPress={() => {
              setIsCameraOpen(true);
              setShowFavourites(false);
            }}
          />
        </>
      )}
    </View>
  );
};

export default MainLayout;
