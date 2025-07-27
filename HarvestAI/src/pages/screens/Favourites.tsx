import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import favouritesStyles from '../../styles/favouritesStyles';
import { useNavigation } from '@react-navigation/native';


const Favourites = () => {
  const navigation = useNavigation();
  return (
    <View style={favouritesStyles.container}>
      <View style={favouritesStyles.topBar}>
        <TouchableOpacity style={favouritesStyles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={favouritesStyles.title}>Favourites</Text>
      </View>

      {/* Placeholder content */}
      <View style={favouritesStyles.content}>
        <Text style={favouritesStyles.placeholderText}>Looks like your favourites list is empty!</Text>
      </View>
    </View>
  );
};

export default Favourites;