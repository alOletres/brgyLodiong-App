import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

type ITokenKey = "accessToken";

export const setToken = async (key: ITokenKey, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (err) {
    throw err;
  }
};

export const getToken = async (key: ITokenKey) => {
  try {
    const token = await SecureStore.getItemAsync(key);

    return token;
  } catch (err) {
    throw err;
  }
};

export const deleteToken = async (key: ITokenKey) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (err) {
    throw err;
  }
};

export const decodeToken = async () => {
  const token = await getToken("accessToken");

  return jwtDecode(token as string);
};
