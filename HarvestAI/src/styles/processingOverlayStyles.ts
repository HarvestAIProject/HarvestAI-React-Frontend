import { StyleSheet } from "react-native";

const processingOverlayStyles = StyleSheet.create({
    overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default processingOverlayStyles;