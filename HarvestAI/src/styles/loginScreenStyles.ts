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
    backgroundColor: '#7BA890',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },

  btnDisabled: {
    opacity: 0.6,
  },

  googleIcon: {
    marginRight: 12,
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

  formContainer: {
    width: '100%',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
  },

  eyeIcon: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  emailBtn: {
    backgroundColor: '#7BA890',
    marginBottom: 12,
  },

  googleBtn: {
    backgroundColor: '#4285f4',
  },

  switchBtn: {
    marginBottom: 20,
  },

  switchText: {
    color: '#7BA890',
    fontSize: 14,
    textAlign: 'center',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },

  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 14,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  toggleBtnActive: {
    backgroundColor: '#7BA890',
  },

  toggleText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },

  toggleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;
