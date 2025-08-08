import { StyleSheet } from 'react-native';

const resultsOverlayStyles = StyleSheet.create({
  container: {
    maxHeight: '90%',
    flex: 1,    
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'InriaSerif-Bold',
    flex: 1,
    paddingLeft: 32, 
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  tabRow: {
    flexDirection: 'row',
    width: '100%',
  },
  tabHalf: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#000',
  },
  inactiveTab: {
    color: 'gray',
  },
  tabUnderlineWrapper: {
    backgroundColor: 'transparent',
    position: 'relative',
    flexDirection: 'row',
  },
  tabUnderline: {
    height: 2,
    width: '50%',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
  },
  leftUnderline: {
    left: 0,
  },
  rightUnderline: {
    left: '50%',
  },
  content: {
    paddingBottom: 32,
    height: '100%',
    backgroundColor: '#f9f9f9',
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

export default resultsOverlayStyles;
