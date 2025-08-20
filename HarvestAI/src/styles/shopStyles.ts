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
    paddingHorizontal: 12,
  },
  placeholderTitle: {
    marginTop: 12,
    fontSize: 18,
    fontFamily: 'InriaSerif-Bold',
    color: '#444',
  },
  placeholderSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },

  /** Grid */
  grid: {
    paddingVertical: 8,
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
  searchWrap: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111',
  },
  clearBtn: {
    paddingHorizontal: 4,
  },
  clearBtnText: {
    fontSize: 22,
    lineHeight: 22,
    color: '#6b7280',
  },
});

export default shopStyles;
