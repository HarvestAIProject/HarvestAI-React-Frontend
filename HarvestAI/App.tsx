import 'react-native-reanimated';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import AppNavigator from './src/routes/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { CartProvider } from './src/context/CartContext';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from './src/auth/clerkTokenCache';
import LoginScreen from './src/pages/screens/LoginScreen';

function Gate() {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return isSignedIn ? <AppNavigator /> : <LoginScreen />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'InriaSerif-Bold': require('./assets/fonts/InriaSerif-Bold.ttf'),
    'InriaSerif-Regular': require('./assets/fonts/InriaSerif-Regular.ttf'),
    'InriaSerif-Italic': require('./assets/fonts/InriaSerif-Italic.ttf'),
  });
  if (!fontsLoaded) return null;

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!; // pk_test_...

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <FavoritesProvider>
          <CartProvider>
            <NavigationContainer>
              <Gate />
            </NavigationContainer>

            <Toast
              position='bottom'
              config={{
                success: (props) => (
                  <BaseToast
                    {...props}
                    style={{ borderLeftColor: '#7BA890', backgroundColor: '#333', borderRadius: 20, paddingVertical: 10, minHeight: 60 }}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    text1Style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
                  />
                ),
                error: (props) => (
                  <ErrorToast
                    {...props}
                    style={{ borderLeftColor: '#f44336', backgroundColor: '#333', borderRadius: 20, paddingVertical: 10, minHeight: 60 }}
                    text1Style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
                  />
                ),
              }}
            />
          </CartProvider>
        </FavoritesProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
