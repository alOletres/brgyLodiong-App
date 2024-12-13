import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginCredentials } from "../../../navigation/screens/login/hook";
import axios from "../../../constants/baseUrl";
import { AxiosError } from "axios";
import { IAPIResponse } from "./auth.slice";
import { handleErrors } from "../../../utils/catchError";

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

      return rejectWithValue(error.response?.data.message);
    }
  }
);
