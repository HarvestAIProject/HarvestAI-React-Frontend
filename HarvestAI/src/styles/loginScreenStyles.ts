import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7BA890',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontFamily: 'InriaSerif-Bold',
    letterSpacing: 0.3,
    color: '#FFF',
    marginBottom: 28,
    textAlign: 'center',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#4285F4',
  },

  btnDisabled: {
    opacity: 0.6,
  },

  googleIcon: {
    marginRight: 8,
  },

  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  footerNote: {
    position: 'absolute',
    bottom: 48,
    left: 24,
    right: 24,
    textAlign: 'center',
    color: '#F9F9F9',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default styles;
