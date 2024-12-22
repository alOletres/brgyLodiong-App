import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateRequestDto } from "../../../navigation/screens/request/type";
import { AxiosError } from "axios";
import { IAPIResponse } from "../auth/auth.slice";
import { handleErrors } from "../../../utils/catchError";
import axios from "../../../constants/baseUrl";

export const createRequestAsync = createAsyncThunk(
  "request/create",
  async (payload: CreateRequestDto, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/request", payload);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<IAPIResponse<undefined>>;
      handleErrors(err);

      return rejectWithValue(error.response?.data.message);
    }
  }
);
