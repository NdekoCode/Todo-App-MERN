export const postItem = async (url, params) => {
  try {
    const response = await fetch(url, params);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
