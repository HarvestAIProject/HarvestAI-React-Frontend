import { Modal, View, TextInput, TouchableOpacity, Text, Image, Animated, Easing } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import profileStyles from '../styles/profileStyles';

type EditProfileModalProps = {
  visible: boolean;
  currentName: string;
  currentBio: string;
  currentImage?: string;
  onSave: (newName: string, newBio: string, newImage?: string) => void;
  onClose: () => void;
};

const EditProfileModal = ({ visible, currentName, currentBio, currentImage, onSave, onClose }: EditProfileModalProps) => {
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    setName(currentName);
    setBio(currentBio);
    setImageUri(currentImage);
  }, [visible, currentName, currentBio, currentImage]);

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
      fadeAnim.setValue(0); // reset for next time
    }
  }, [visible]);

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} animationType="none" transparent>
      <Animated.View
        style={[
          profileStyles.modalOverlay,
          { backgroundColor: fadeAnim.interpolate({
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
                    : require('../assets/profile-placeholder.png') // fallback
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
                <Ionicons name="close-circle" size={20} color="#e74c3c" />
              </TouchableOpacity>
            )}
          </View>

          {/* Name Input */}
          <TextInput
            style={profileStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter new name"
          />

          {/* Bio Input */}
          <TextInput
            style={[profileStyles.input, { height: 80 }]}
            value={bio}
            onChangeText={setBio}
            placeholder="Enter bio"
            multiline
          />

          <View style={profileStyles.buttonRow}>
            <TouchableOpacity style={profileStyles.saveButton} onPress={() => onSave(name, bio, imageUri)}>
              <Text style={profileStyles.saveText}>Save</Text>
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
