import 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './src/routes/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

export default function App() {
  const [fontsLoaded] = useFonts({
    'InriaSerif-Bold': require('./assets/fonts/InriaSerif-Bold.ttf'),
    'InriaSerif-Regular': require('./assets/fonts/InriaSerif-Regular.ttf'),
    'InriaSerif-Italic': require('./assets/fonts/InriaSerif-Italic.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
                <Toast
          config={{
            success: (props) => (
              <BaseToast
                {...props}
                style={{
                  borderLeftColor: '#7BA890',
                  backgroundColor: '#333',
                  borderRadius: 20,
                  paddingVertical: 10,
                  minHeight: 60,
                }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#fff',
                }}
              />
            ),
            error: (props) => (
              <ErrorToast
                {...props}
                style={{
                  borderLeftColor: '#f44336',
                  backgroundColor: '#333',
                  borderRadius: 20,
                  paddingVertical: 10,
                  minHeight: 60,
                }}
                text1Style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#fff',
                }}
              />
            ),
          }}
        />
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
