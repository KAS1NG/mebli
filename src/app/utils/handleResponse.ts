export const handleResponse = async (response: Response) => {
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`Error: ${response.status} - ${errorMsg}`);
    }
    return response.json();
  };