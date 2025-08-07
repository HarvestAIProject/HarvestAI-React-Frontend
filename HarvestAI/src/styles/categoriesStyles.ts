import { StyleSheet } from 'react-native';

const categoriesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
    fontWeight: 'bold',
    fontFamily: 'InriaSerif-Bold',
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  categoryRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  categoryText: {
    fontFamily: 'InriaSerif-Regular',
    fontSize: 20,
    color: '#000',
  },
});

export default categoriesStyles;