/**
 * Sends the image to the backend model for processing.
 * @param uri local URI of the image
 * @returns response from your model server
 */
export const sendImageToModel = async (uri: string) => {
  // const formData = new FormData();

  // formData.append('file', {
  //   uri,
  //   name: 'image.jpg',
  //   type: 'image/jpeg',
  // } as unknown as Blob);

  // try {
  //   const response = await fetch('https://672e06067e1a.ngrok-free.app/api/predict', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const result = await response.json();
  //   console.log('Response from model:', result);
  //   return result;
  // } catch (error) {
  //   console.error('Error sending image to model:', error);
  //   throw error;
  // }

  console.log('Mock sending image to model:', uri);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mocked response structure
  const results = [
    {
      id: '1',
      title: 'Grilled Eggplant Salad with Sesame Dressing',
      image: uri,
      rating: 4.5,
      link: 'https://example.com/recipe/1',
      likes: 120,
    },
    {
      id: '2',
      title: 'Eggplant Parmesan',
      image: uri,
      rating: 4.8,
      link: 'https://example.com/recipe/2',
      likes: 200,
    },
  ];

  console.log('Returning mock result:', results);
  return results;
};