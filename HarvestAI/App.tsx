import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import AppNavigator from './src/routes/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'InriaSerif-Bold': require('./assets/fonts/InriaSerif-Bold.ttf'),
    'InriaSerif-Regular': require('./assets/fonts/InriaSerif-Regular.ttf'),
    'InriaSerif-Italic': require('./assets/fonts/InriaSerif-Italic.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
