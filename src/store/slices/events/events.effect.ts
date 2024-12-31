import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../../utils/catchError";
import { IAPIResponse } from "../auth/auth.slice";
import { AxiosError } from "axios";
import axios from "../../../constants/baseUrl";

export const fetchAllEventsAsync = createAsyncThunk(
  "events",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/events");

      return data;
    } catch (err) {
      const error = err as AxiosError<IAPIResponse<undefined>>;
      handleErrors(err);

      return rejectWithValue(error.response?.data.message);
    }
  }
);
