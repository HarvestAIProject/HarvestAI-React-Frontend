// Profile.tsx
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import profileStyles from '../../styles/profileStyles';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo } from 'react';
import EditProfileModal from '../EditProfileModal';
import { useAuth, useUser } from '@clerk/clerk-expo';

type MyMeta = { displayName?: string; bio?: string };

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'saved' | 'posts'>('saved');
  const [showEditModal, setShowEditModal] = useState(false);
  const { signOut } = useAuth();
  const { user } = useUser();

  const meta = (user?.unsafeMetadata as MyMeta) || {};
  const displayName = meta.displayName || user?.fullName || user?.firstName || '';
  const bio = meta.bio && meta.bio.trim().length > 0
    ? meta.bio
    : 'Just a boring foodie :/';
  const profileImageUrl = user?.imageUrl || null;

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
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
    ]);
  };

  return (
    <View style={profileStyles.container}>
      {/* Top right icon buttons */}
      <View style={profileStyles.topRightIcons}>
        <TouchableOpacity style={profileStyles.iconButton} onPress={() => setShowEditModal(true)}>
          <Ionicons name="pencil-outline" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.iconButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View style={profileStyles.profileHeader}>
        <Image
          source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/profile-placeholder.png')}
          style={profileStyles.profileImage}
        />
        <Text style={profileStyles.name}>{displayName || 'Your Name'}</Text>
        <Text style={profileStyles.bio}>{bio}</Text>
      </View>

      {/* Tabs */}
      <View style={profileStyles.tabWrapper}>
        <View style={profileStyles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('saved')} style={profileStyles.tabItem}>
            <Ionicons
              name={activeTab === 'saved' ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={activeTab === 'saved' ? '#6c9a83' : '#999'}
            />
            <Text style={[profileStyles.sectionText, activeTab === 'saved' && profileStyles.activeTabText]}>Saved</Text>
            <View style={[profileStyles.indicator, activeTab !== 'saved' && profileStyles.inactiveIndicator]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('posts')} style={profileStyles.tabItem}>
            <Ionicons
              name={activeTab === 'posts' ? 'document-text' : 'document-text-outline'}
              size={20}
              color={activeTab === 'posts' ? '#6c9a83' : '#999'}
            />
            <Text style={[profileStyles.sectionText, activeTab === 'posts' && profileStyles.activeTabText]}>My Posts</Text>
            <View style={[profileStyles.indicator, activeTab !== 'posts' && profileStyles.inactiveIndicator]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={profileStyles.tabContent}>
        <Text style={{ color: '#666' }}>No content available yet.</Text>
      </View>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={showEditModal}
        currentName={displayName}
        currentBio={bio}
        onClose={() => setShowEditModal(false)}
      />
    </View>
  );
};

export default Profile;
