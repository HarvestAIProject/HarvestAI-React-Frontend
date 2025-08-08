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
    
    // Create FormData with proper file
    const formData = new FormData();
    formData.append('file', blob, 'image.jpg');

    // Send image to your Go backend
    const spoonacularResponse = await fetch('http://localhost:8080/recipes/by-ingredients', {
      method: 'POST',
      body: formData,
    });
    
    if (!spoonacularResponse.ok) {
      throw new Error(`API error! status: ${spoonacularResponse.status}`);
    }
    
    // const spoonacularResult = await spoonacularResponse.json();

    const spoonacularResult = await spoonacularResponse.json();
    console.log('Response from backend:', spoonacularResult);
    
    // Return the result
    return spoonacularResult;
    
  } catch (error) {
    console.error('Error in image processing pipeline:', error);
    throw error;
  }

 // console.log('Mock sending image to model:', uri);

  // // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // // Mocked response structure
  // const results = [
  //   {
  //     id: '1',
  //     title: 'Grilled Eggplant Salad with Sesame Dressing',
  //     image: uri,
  //     rating: 4.5,
  //     link: 'https://example.com/recipe/1',
  //     likes: 120,
  //   },
  //   {
  //     id: '2',
  //     title: 'Eggplant Parmesan',
  //     image: uri,
  //     rating: 4.8,
  //     link: 'https://example.com/recipe/2',
  //     likes: 200,
  //   },
  // ];

  // console.log('Returning mock result:', results);
  // return results;
};