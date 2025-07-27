import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 52,
  },
  topRightIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  iconButton: {
    padding: 8,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: 'InriaSerif-Bold',
    color: '#000',
  },
  bio: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabWrapper: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    alignSelf: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTabText: {
    color: '#6c9a83',
    fontWeight: '600',
  },

  tabContent: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  
  indicator: {
    height: 3,
    width: '60%',
    backgroundColor: '#6c9a83',
    borderRadius: 2,
    marginTop: 4,
    alignSelf: 'center',
  },

  inactiveIndicator: {
    backgroundColor: 'transparent',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
  },

  editTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },

  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginLeft: 4,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },

  charCount: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#888',
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },

  saveButton: {
    backgroundColor: '#6c9a83',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  cancelText: {
    color: '#333',
    fontWeight: 'bold',
  },

  editImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 8,
    backgroundColor: '#ccc',
  },

  changeImageText: {
    fontSize: 12,
    color: '#6c9a83',
    textAlign: 'center',
    marginBottom: 16,
  },

  editImageWrapper: {
    alignSelf: 'center',
    marginBottom: 16,
    // allow absolute positioning of the remove button
  },

  removeImageButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default profileStyles;
