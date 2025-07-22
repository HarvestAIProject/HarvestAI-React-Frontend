/**
 * Sends the image to the backend model for processing.
 * @param uri local URI of the image
 * @returns response from your model server
 */
export const sendImageToModel = async (uri: string) => {
  const formData = new FormData();

  formData.append('file', {
    uri,
    name: 'image.jpg',
    type: 'image/jpeg',
  } as any);

  try {
    const response = await fetch('https://672e06067e1a.ngrok-free.app/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Response from model:', result);
    return result;
  } catch (error) {
    console.error('Error sending image to model:', error);
    throw error;
  }
};