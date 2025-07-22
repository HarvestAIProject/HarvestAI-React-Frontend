import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'InriaSerif-Bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
    width: '60%',
  },
  placeholder: {
    fontSize: 16,
    fontFamily: 'InriaSerif-Italic',
    color: '#888',
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 14,
    color: '#6c9a83',
    fontWeight: '600',
  },
  dishSection: {
    minHeight: 180,
  },
  categorySection: {
    flex:1,
  },
  mealTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    gap: 24,
  },
  mealTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
    minWidth: 80, // ensures buttons don’t shrink too much
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTabText: {
    fontSize: 20,
    fontFamily: 'InriaSerif-Regular',
    color: '#000',
  },
  mealTabActive: {
    backgroundColor: '#6c9a83',
  },
  mealTabTextActive: {
    color: '#fff',
  },
});

export default homeStyles;