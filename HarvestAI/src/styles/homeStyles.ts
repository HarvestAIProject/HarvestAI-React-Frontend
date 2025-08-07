import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    flex: 1,
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
    color: '#7BA890',
    fontWeight: '600',
  },
  categorySection: {
    flex: 1,
    gap: 10,
    marginTop: 12,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryCardImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryText: {
    fontFamily: 'InriaSerif-Regular',
    fontSize: 18,
    color: '#000',
  },
  dishSection: {
    marginTop: 12,
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },

  cardInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#a0aec0',
    width: '60%',
    marginVertical: 4,
  },

  cardLink: {
    color: '#7BA890',
    fontWeight: '500',
    fontSize: 14,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#7BA890',
    width: 20,
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