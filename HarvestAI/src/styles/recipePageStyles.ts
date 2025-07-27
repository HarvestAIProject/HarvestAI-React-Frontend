import { StyleSheet } from "react-native";

const recipePageStyles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
  }
});

export default recipePageStyles;