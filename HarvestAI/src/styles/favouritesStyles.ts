import { StyleSheet } from 'react-native';

const favouritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 8,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  placeholderText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#444',
    textAlign: 'center',
  },
  placeholderSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'InriaSerif-Bold',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#a0aec0',
    width: '60%',
    marginVertical: 8,
  },
  subtitle: {
    color: '#7BA890',
    fontWeight: '500',
    fontSize: 14,
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
});

export default favouritesStyles;