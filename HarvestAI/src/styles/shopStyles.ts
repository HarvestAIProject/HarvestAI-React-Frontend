import { StyleSheet } from 'react-native';

const shopStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },

  /** Empty state */
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },

  /** Grid */
  grid: {
    paddingVertical: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  /** Card */
  card: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  addButton: {
    alignSelf: 'stretch',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default shopStyles;
