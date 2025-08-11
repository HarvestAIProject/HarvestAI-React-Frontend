import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import profileStyles from '../../styles/profileStyles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import EditProfileModal from '../EditProfileModal'; 
import { useAuth } from '@clerk/clerk-expo';

type Props = {
  userName: string;
  bio: string;
  profileImage: string | null;
  setUserName: (name: string) => void;
  setBio: (bio: string) => void;
  setProfileImage: (img: string | null) => void;
};

const Profile = ({ userName, bio, profileImage, setUserName, setBio, setProfileImage }: Props) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'posts'>('saved');
  const [showEditModal, setShowEditModal] = useState(false);
  const { signOut } = useAuth();

  const getIconColor = (tab: string) => (activeTab === tab ? '#6c9a83' : '#999');
  const getTextStyle = (tab: string) => [
    profileStyles.sectionText,
    activeTab === tab && profileStyles.activeTabText,
  ];

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (err) {
              console.error('Error signing out:', err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={profileStyles.container}>
      {/* Top right icon buttons */}
      <View style={profileStyles.topRightIcons}>
        <TouchableOpacity style={profileStyles.iconButton} onPress={handleEditProfile}>
          <Ionicons name="pencil-outline" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.iconButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View style={profileStyles.profileHeader}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../assets/profile-placeholder.png')
          }
          style={profileStyles.profileImage}
        />
        <Text style={profileStyles.name}>{userName}</Text>
        <Text style={profileStyles.bio}>{bio}</Text>
      </View>

      {/* Tab Section */}
      <View style={profileStyles.tabWrapper}>
        <View style={profileStyles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('saved')} style={profileStyles.tabItem}>
            <Ionicons
              name={activeTab === 'saved' ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={getIconColor('saved')}
            />
            <Text style={getTextStyle('saved')}>Saved</Text>
            <View style={[profileStyles.indicator, activeTab !== 'saved' && profileStyles.inactiveIndicator]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('posts')} style={profileStyles.tabItem}>
            <Ionicons
              name={activeTab === 'posts' ? 'document-text' : 'document-text-outline'}
              size={20}
              color={getIconColor('posts')}
            />
            <Text style={getTextStyle('posts')}>My Posts</Text>
            <View style={[profileStyles.indicator, activeTab !== 'posts' && profileStyles.inactiveIndicator]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content for active tab */}
      <View style={profileStyles.tabContent}>
        <Text style={{ color: '#666' }}>No content available yet.</Text>
      </View>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={showEditModal}
        currentName={userName}
        currentBio={bio}
        currentImage={profileImage || undefined}
        onSave={(newName, newBio, newImage) => {
          setUserName(newName);
          setBio(newBio);
          setProfileImage(newImage ?? null);
          setShowEditModal(false);
        }}
        onClose={() => setShowEditModal(false)}
      />
    </View>
  );
};

export default Profile;
