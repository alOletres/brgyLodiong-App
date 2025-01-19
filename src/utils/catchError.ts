export const handleErrors = (result: any) => {
  console.log("result", result);

  if (result.response) {
    throw result.response.data;
  }
};

export const handleTryCatchError = (result: any) => {
  const error = result?.error
    ? result.error.data
    : result?.response?.data?.message;

  return error;
};

export const isError = (response: any): response is { message: string } => {
  return response && "error" in response;
};
