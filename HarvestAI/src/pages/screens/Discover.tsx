import { View, Text } from 'react-native';
import discoverStyles from '../../styles/discoverStyles';

const Discover = () => {
  const articles: any[] = []; // Empty list for now, will fetch real data in the future

  return (
    <View style={discoverStyles.container}>
      {articles.length === 0 ? (
        <View style={discoverStyles.placeholderContainer}>
          <Text style={discoverStyles.placeholderTitle}>Feed looking empty :(</Text>
          <Text style={discoverStyles.placeholderSubtitle}>
            Come back soon to discover blogs and food stories from the community!
          </Text>
        </View>
      ) : (
        // Future: Replace with article feed when data is available
        <View>{/* FlatList of articles */}</View>
      )}
    </View>
  );
};

export default Discover;
