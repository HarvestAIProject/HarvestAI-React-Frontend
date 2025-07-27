import { StyleSheet } from "react-native";

const recipeOverviewStyles = StyleSheet.create({
    background: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    closeButton: {
      position: 'absolute',
      top: 70,
      right: 20,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      width: '90%',
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    rowEnd: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 12,
    },
    title: {
      color: '#333',
      fontSize: 20,
      fontWeight: 'bold',
    },
    titleWithFlex: {
      flex: 1,
      paddingRight: 12, // leaves space before the heart
      justifyContent: 'center',
    },
    likesText: {
      color: '#666',
      fontSize: 10,
      marginLeft: 8,
    },
    tagsRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    tag: {
      backgroundColor: '#7BA890',
      padding: 6,
      borderRadius: 4,
      marginRight: 8,
    },
    descriptionContainer: {
      maxHeight: 150,
      marginVertical: 8,
    },
    description: {
      color: '#444',
      fontSize: 14,
      lineHeight: 18,
    },
    viewButton: {
      backgroundColor: '#7BA890',
      padding: 12,
      marginTop: 8,
      borderRadius: 6,
    },
    viewButtonText: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    caloriesContainer: {
      borderColor: '#aaa',
      borderWidth: 1,
      padding: 12,
      marginTop: 8,
      borderRadius: 6,
    },
    caloriesContainerText: {
      textAlign: 'center',
      color: '#333',
    },
    iconButton: {
      alignItems: 'center',
      marginHorizontal: 4,
    },
    iconTouch: {
      padding: 2,
    },
    iconLabel: {
      color: '#444',
      fontSize: 10,
      marginTop: 4,
    },
  });

export default recipeOverviewStyles;