import { StyleSheet } from 'react-native';

const topBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#7BA890', // light green background
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 24,
    fontFamily: 'InriaSerif-Bold',
    color: 'white',
  },
  heartButton: {
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  searchBar: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1e5e4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  searchPlaceholder: {
    color: '#6b7280',
    fontSize: 16,
    marginLeft: 8,
  },
  shopTitle: {
    fontSize: 24,
    fontFamily: 'InriaSerif-Bold',
    color: 'white',
  },
  cartButton: {
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default topBarStyles;
