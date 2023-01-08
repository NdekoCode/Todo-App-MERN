export const postItem = async (url, params) => {
  params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    ...params,
  };
  try {
    const response = await fetch(url, params);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async (url) => {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
