import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginCredentials } from "../../../navigation/screens/login/hook";
import axios from "../../../constants/baseUrl";
import { AxiosError } from "axios";
import { IAPIResponse } from "./auth.slice";
import { handleErrors } from "../../../utils/catchError";
import { ChangePasswordDto } from "../../../navigation/screens/login/type";

export const LoginAsync = createAsyncThunk(
  "auth/login",
  async (payload: ILoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ access_token: string }>(
        "/api/login",
        payload
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError<IAPIResponse<undefined>>;

      handleErrors(err);

      return rejectWithValue(error);
    }
  }
);

export const ChangePasswordAsync = createAsyncThunk(
  "auth/changepassword",
  async ({ email, ...payload }: ChangePasswordDto, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/${email}`, payload);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<IAPIResponse<undefined>>;
      handleErrors(err);

      return rejectWithValue(error.response?.data.message);
    }
  }
);
