import * as ImagePicker from 'expo-image-picker';
import { CameraType, FlashMode, CameraView } from 'expo-camera';
import { Gesture } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';

/**
 * Create a pinch-to-zoom gesture.
 * @param zoomShared SharedValue for zoom
 * @param pinchStartZoom SharedValue for initial zoom
 * @returns A configured Pinch gesture
 */
export const createPinchGesture = (
  zoomShared: SharedValue<number>,
  pinchStartZoom: SharedValue<number>
) => {
  return Gesture.Pinch()
    .onBegin(() => {
      pinchStartZoom.value = zoomShared.value;
    })
    .onUpdate((e) => {
      const next = Math.min(Math.max(pinchStartZoom.value + (e.scale - 1) * 0.2, 0), 1);
      zoomShared.value = next;
    });
};

/**
 * Launch image library and select a photo.
 * @param setPreviewUri function to update the preview URI
 */
export const handlePickImage = async (
  setPreviewUri: (uri: string) => void
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    console.log('Picked image:', uri);
    setPreviewUri(uri);
  }
};

/**
 * Capture photo using camera.
 * @param cameraRef ref to CameraView
 * @param isCameraReady camera readiness state
 * @param setPreviewUri function to update the preview URI
 */
export const handleSnap = async (
  cameraRef: React.RefObject<CameraView | null>,
  isCameraReady: boolean,
  setPreviewUri: (uri: string) => void
) => {
  if (cameraRef.current && isCameraReady) {
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: true,
        base64: false,
      });
      console.log('Photo captured:', photo.uri);
      setPreviewUri(photo.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  } else {
    console.warn('Camera not ready');
  }
};

/**
 * Toggle flash mode between 'off', 'on', and 'auto'
 * @param currentFlash current flash mode
 */
export const toggleFlash = (setFlash: React.Dispatch<React.SetStateAction<FlashMode>>) => {
  setFlash((prev) => {
    if (prev === 'off') return 'on';
    if (prev === 'on') return 'auto';
    return 'off';
  });
};

/**
 * Toggle camera facing direction
 * @param current current facing direction
 */
export const toggleCameraFacing = (setFacing: React.Dispatch<React.SetStateAction<CameraType>>) => {
  setFacing((current) => (current === 'back' ? 'front' : 'back'));
};
