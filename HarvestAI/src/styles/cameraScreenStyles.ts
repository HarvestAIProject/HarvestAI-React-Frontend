import { StyleSheet } from 'react-native';

const cameraScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  
  camera: {
    flex: 1,
  },

  closeButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
  },

  flashButton: {
    position: 'absolute',
    top: 60,
    right: 25,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
  },

  bottomOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  galleryButton: {
    position: 'absolute',
    left: 30,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
  },

  snapButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#ccc',
  },

  flipButton: {
    position: 'absolute',
    right: 30,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
  },

  permissionButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 10,
  },

  text: {
    color: 'black',
    fontWeight: 'bold',
  },

  message: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },

  previewContainer: {
    flex: 1,
    position: 'relative',
  },

  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  usePhotoButton: {
    position: 'absolute',
    bottom: 40,
    right: 20, // position it 20px from the right edge
    backgroundColor: '#7BA890',
    padding: 18,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default cameraScreenStyles;
