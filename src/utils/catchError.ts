export const handleErrors = (result: any) => {
  if (result.response) {
    throw result.response.data;
  }
};

export const isError = (response: any): response is { message: string } => {
  return response && "error" in response;
};
