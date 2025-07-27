import { View, ImageBackground, TouchableOpacity } from "react-native";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import recipePageStyles from '../styles/recipePageStyles';

const RecipePage =() => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipePage'>>();
  const { item } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={recipePageStyles.background}
      resizeMode="cover"
    >
      <View style={recipePageStyles.overlay} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={recipePageStyles.backButton}
      >
        <MaterialIcons name="arrow-back-ios" size={32} color="white" />
      </TouchableOpacity>
    </ImageBackground>
    
  );
}

export default RecipePage;