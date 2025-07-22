import { View, Text } from 'react-native';
import shopStyles from '../../styles/shopStyles';

const Shop = () => {
  const listings: any[] = []; // Empty list for now, will fetch real data in the future

  return (
    <View style={shopStyles.container}>
      {listings.length === 0 ? (
        <View style={shopStyles.placeholderContainer}>
          <Text style={shopStyles.placeholderTitle}>No Listings yet :(</Text>
          <Text style={shopStyles.placeholderSubtitle}>
            Come back soon to explore the variety of goods sold by our beloved vendors!
          </Text>
        </View>
      ) : (
        // Future: Replace with shop listings when data is available
        <View>{/* FlatList of listings */}</View>
      )}
    </View>
  );
};

export default Shop;
