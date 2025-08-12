// EditProfileModal.tsx
import { Modal, View, TextInput, TouchableOpacity, Text, Image, Animated, Easing, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import profileStyles from '../styles/profileStyles';
import { useUser } from '@clerk/clerk-expo';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

type EditProfileModalProps = {
  visible: boolean;
  currentName: string;
  currentBio: string;
  onClose: () => void;
};

type FileInfoWithSize = FileSystem.FileInfo & { size?: number };

const EditProfileModal = ({ visible, currentName, currentBio, onClose }: EditProfileModalProps) => {
  const { user } = useUser();

  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(currentName);
    setBio(currentBio);
    setImageUri(undefined);
  }, [visible, currentName, currentBio]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const MAX_BYTES = 9 * 1024 * 1024;

  async function getSize(uri: string) {
    const info = (await FileSystem.getInfoAsync(uri, { size: true })) as FileInfoWithSize;
    return info.size ?? 0;
  }

  async function compressUnderLimit(uri: string) {
    let currentUri = uri;
    let size = await getSize(currentUri);

    let compress = 0.8;
    let width = 1200;

    while (size > MAX_BYTES && (compress >= 0.3 || width >= 500)) {
      const result = await ImageManipulator.manipulateAsync(
        currentUri,
        [{ resize: { width } }],
        { compress, format: ImageManipulator.SaveFormat.JPEG }
      );
      currentUri = result.uri;
      size = await getSize(currentUri);

      if (compress > 0.3) compress -= 0.1;
      else width = Math.floor(width * 0.8);
    }

    return { uri: currentUri, size };
  }

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    const rawUri = result.assets[0].uri;
    const { uri: compressedUri, size } = await compressUnderLimit(rawUri);

    if (size > MAX_BYTES) {
      Alert.alert(
        'Image too large',
        'Even after compression the image is still too big. Try a different photo.'
      );
      return;
    }

    setImageUri(compressedUri);
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);

      const current = (user.unsafeMetadata || {}) as Record<string, unknown>;
      await user.update({
        unsafeMetadata: {
          ...current,
          displayName: name,
          bio,
        },
      });

      if (imageUri) {
        const file = {
          uri: imageUri,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        } as any;

        await user.setProfileImage({ file });
      }
      await user.reload();

      onClose();
    } catch (e) {
      console.error(e);
      Alert.alert('Save failed', 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="none" transparent>
      <Animated.View
        style={[
          profileStyles.modalOverlay,
          {
            backgroundColor: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
            }),
          },
        ]}
      >
        <View style={profileStyles.modalContent}>
          <Text style={profileStyles.editTitle}>Edit Profile</Text>

          {/* Display Picture */}
          <View style={profileStyles.editImageWrapper}>
            <TouchableOpacity onPress={handleChooseImage} activeOpacity={0.8}>
              <Image
                source={
                  imageUri
                    ? { uri: imageUri }
                    : user?.imageUrl
                      ? { uri: user.imageUrl }
                      : require('../assets/profile-placeholder.png')
                }
                style={profileStyles.editImage}
              />
              <Text style={profileStyles.changeImageText}>Tap to change picture</Text>
            </TouchableOpacity>

            {imageUri && (
              <TouchableOpacity
                style={profileStyles.removeImageButton}
                onPress={() => setImageUri(undefined)}
                hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <Ionicons name="close-circle" size={22} color="#e74c3c" />
              </TouchableOpacity>
            )}
          </View>

          {/* Name */}
          <Text style={profileStyles.inputLabel}>Name</Text>
          <TextInput
            style={profileStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter new name"
          />

          {/* Bio */}
          <Text style={[profileStyles.inputLabel, { marginTop: 12 }]}>Bio</Text>
          <TextInput
            style={[profileStyles.input, { height: 80 }]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell people a little about yourself (max 100 chars)"
            multiline
            maxLength={100}
          />
          <Text style={profileStyles.charCount}>{bio.length}/100</Text>

          <View style={profileStyles.buttonRow}>
            <TouchableOpacity
              style={[profileStyles.saveButton, saving && { opacity: 0.6 }]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={profileStyles.saveText}>{saving ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.cancelButton} onPress={onClose}>
              <Text style={profileStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default EditProfileModal;
