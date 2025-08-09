import 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './src/routes/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';

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
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
