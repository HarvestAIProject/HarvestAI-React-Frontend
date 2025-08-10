// utils/toast.ts
import Toast from 'react-native-toast-message';

export const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
  Toast.show({ type, text1: msg, position: 'bottom' });
};