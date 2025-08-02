import { StyleSheet } from 'react-native';

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  loader: {
    marginTop: 20,
  },
  resultList: {
    paddingBottom: 32,
  },
  resultCard: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default searchStyles;
