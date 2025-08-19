import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import CameraScreen from '../pages/CameraScreen';
import Favourites from '../pages/screens/Favourites';
import Cart from '../pages/screens/Cart';
import RecipeOverviewScreen from '../pages/RecipeOverviewScreen';
import RecipePage from '../pages/RecipePage';
import MainLayout from '../layout/MainLayout';
import SearchScreen from '../pages/SearchScreen';
import CategoriesScreen from '../pages/CategoriesScreen';
import CategoriesResultsScreen from '../pages/CategoriesResultsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={MainLayout} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Camera" component={CameraScreen} />
    <Stack.Screen name="Favourites" component={Favourites} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="RecipeOverview" component={RecipeOverviewScreen} />
    <Stack.Screen name="RecipePage" component={RecipePage} />
    <Stack.Screen name="Categories" component={CategoriesScreen} />
    <Stack.Screen name="CategoriesResults" component={CategoriesResultsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
