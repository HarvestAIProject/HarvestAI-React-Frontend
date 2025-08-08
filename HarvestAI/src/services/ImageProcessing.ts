import { fetchRecipesByImage } from '../api/recipeApi';

/**
 * Sends the image to the backend model for processing.
 * @param uri local URI of the image
 * @returns response from spoonacular API server
 */
export const sendImageToModel = async (uri: string) => {
  try {
    // Convert URI to blob first
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Use the API function
    const spoonacularResult = await fetchRecipesByImage(blob);
    console.log('Response from backend:', spoonacularResult);
    
    return spoonacularResult;
    
  } catch (error) {
    console.error('Error in image processing pipeline:', error);
    throw error;
  }
};