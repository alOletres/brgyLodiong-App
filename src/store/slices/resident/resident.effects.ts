import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../constants/baseUrl";
import { handleErrors } from "../../../utils/catchError";
import { AxiosError } from "axios";
import { IAPIResponse } from "../auth/auth.slice";

export const createResidentAsync = createAsyncThunk(
  "resident/create",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/residents", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError<IAPIResponse<undefined>>;
      handleErrors(err);

      console.log("error", error);

      return rejectWithValue(error.response?.data.message);
    }
  }
);
