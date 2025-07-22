import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import processingOverlayStyles from '../styles/processingOverlayStyles';

const ProcessingOverlay = () => {
  return (
    <View style={processingOverlayStyles.overlay}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={processingOverlayStyles.text}>Processing...</Text>
    </View>
  );
};

export default ProcessingOverlay;