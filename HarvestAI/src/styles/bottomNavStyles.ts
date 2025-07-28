import { StyleSheet } from 'react-native';

const bottomNavStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'relative',
  },
  iconGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
  label: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  cameraButton: {
    position: 'absolute',
    top: -14,
    left: '50%',
    transform: [{ translateX: -35 }],
    backgroundColor: '#6c9a83',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cameraIcon: {
    fontSize: 32,
    color: 'white',
  },
  cameraSpacer: {
    width: 70,
  },
  activeIcon: {
    color: '#000', // ensure icon is black
  },
  activeLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default bottomNavStyles;
