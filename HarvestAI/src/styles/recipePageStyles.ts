import { StyleSheet } from "react-native";

const recipePageStyles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  headerContainer: {
    marginTop: 140,
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flex: 1,
    marginRight: 12,
    backgroundColor: '#7ba890ee',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconLabel: {
    fontSize: 10,
    color: 'white',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 12,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  descriptionContainer: {
    marginTop: 8,
    marginBottom: 12,
    maxHeight: '40%',
    overflow: 'hidden',
  },
  description: {
    color: 'white',
    fontSize: 12,
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 16,
    marginTop: 16,
  },
  tabItem: {
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  cardGrid: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 8,
    width: '45%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardImage: {
    height: 100,
    width: '100%',
  },
  cardTextContainer: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },
  textContentContainer: {
    padding: 16,
  },
  textContent: {
    color: '#333',
    fontSize: 14,
    lineHeight: 22,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  stepNumber: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#6c9a83',
  },

  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default recipePageStyles;