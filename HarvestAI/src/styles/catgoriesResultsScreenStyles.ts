import { StyleSheet } from 'react-native';

const resultsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'InriaSerif-Bold',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    color: '#000',
    fontFamily: 'InriaSerif-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#555',
    fontFamily: 'InriaSerif-Regular',
  },
  emptyContainer: {
    paddingTop: 80,
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 18,
    color: '#999',
    fontFamily: 'InriaSerif-Regular',
  },
});

export default resultsScreenStyles;
