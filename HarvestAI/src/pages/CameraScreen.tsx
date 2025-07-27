import { CameraType, FlashMode, useCameraPermissions, CameraView } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import cameraScreenStyles from '../styles/cameraScreenStyles';
import ProcessingOverlay from '../components/ProcessingOverlay';
import { sendImageToModel } from '../services/ImageProcessing';
import {
  handlePickImage,
  handleSnap,
  toggleFlash,
  toggleCameraFacing,
  createPinchGesture
} from '../utils/CameraUtils';
import ResultsOverlay from '../components/ResultsOverlay';
import { ResultItem } from '../types/ResultItem';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const zoomShared = useSharedValue(0);
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);
  const pinchStartZoom = useSharedValue(0);

  const [results, setResults] = useState<ResultItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [resultsOverlayClosed, setResultsOverlayClosed] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setZoom(zoomShared.value);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (resultsOverlayClosed) {
      setPreviewUri(null);
      setResultsOverlayClosed(false); // reset flag
    }
  }, [resultsOverlayClosed]);

  const pinchGesture = createPinchGesture(zoomShared, pinchStartZoom);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={cameraScreenStyles.container}>
        <Text style={cameraScreenStyles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={cameraScreenStyles.container}>
      {isProcessing && <ProcessingOverlay />}

      {previewUri ? (
        <View style={cameraScreenStyles.previewContainer}>
          <Image source={{ uri: previewUri }} style={cameraScreenStyles.previewImage} />

          {!isProcessing && !showResults && (
            <>
              <TouchableOpacity
                onPress={() => setPreviewUri(null)}
                style={cameraScreenStyles.closeButton}
              >
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  setIsProcessing(true);
                  try {
                    const modelResults = await sendImageToModel(previewUri);
                    setResults(modelResults);
                  } catch (e) {
                    console.error(e);
                    setResults([]);
                  } finally {
                    setShowResults(true);
                    setIsProcessing(false);
                  }
                }}
                style={cameraScreenStyles.usePhotoButton}
              >
                <Ionicons name="arrow-forward" size={24} color="white" />
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <>
          <GestureDetector gesture={pinchGesture}>
            <View style={{ flex: 1 }}>
              <CameraView
                ref={cameraRef}
                style={cameraScreenStyles.camera}
                facing={facing}
                zoom={zoom}
                flash={flash}
                autofocus="on"
                onCameraReady={() => setIsCameraReady(true)}
              />
            </View>
          </GestureDetector>

          {!isProcessing && !showResults && (
            <>
              <TouchableOpacity style={cameraScreenStyles.closeButton} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={cameraScreenStyles.flashButton}
                onPress={() => toggleFlash(setFlash)}
              >
                <Ionicons
                  name={
                    flash === 'off'
                      ? 'flash-off-outline'
                      : flash === 'on'
                      ? 'flash-outline'
                      : 'flash'
                  }
                  size={28}
                  color="white"
                />
              </TouchableOpacity>

              <View style={cameraScreenStyles.bottomOverlay}>
                <TouchableOpacity
                  style={cameraScreenStyles.galleryButton}
                  onPress={() => handlePickImage(setPreviewUri)}
                >
                  <Ionicons name="image-outline" size={26} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={cameraScreenStyles.snapButton}
                  onPress={() => handleSnap(cameraRef, isCameraReady, setPreviewUri)}
                />

                <TouchableOpacity
                  style={cameraScreenStyles.flipButton}
                  onPress={() => toggleCameraFacing(setFacing)}
                >
                  <Ionicons name="camera-reverse-outline" size={28} color="white" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}

      <ResultsOverlay
        results={results}
        visible={showResults}
        onClose={() => {
          setShowResults(false); // triggers sheet to close
        }}
        onCloseComplete={() => {
          setResultsOverlayClosed(true); // will trigger useEffect
        }}
      />
    </View>
  );
};

export default CameraScreen;

