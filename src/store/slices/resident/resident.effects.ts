import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateResidentsDto } from "../../../navigation/screens/signup/type";
import axios from "../../../constants/baseUrl";
import { handleErrors } from "../../../utils/catchError";
import { AxiosError } from "axios";
import { IAPIResponse } from "../auth/auth.slice";

export const createResidentAsync = createAsyncThunk(
  "resident/create",
  async (payload: CreateResidentsDto, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/residents", payload);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<IAPIResponse<undefined>>;
      handleErrors(err);

      return rejectWithValue(error.response?.data.message);
    }
  }
);
