import { StyleSheet } from 'react-native';

const discoverStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 12,
  },
  title: {
    color: '#000',
    fontFamily: 'InriaSerif-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    color: '#444',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default discoverStyles;