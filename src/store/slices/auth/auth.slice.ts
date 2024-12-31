import { createSlice } from "@reduxjs/toolkit";
import { LoginAsync } from "./auth.effect";

export interface IAPIResponse<T> {
  message?: string;
  data?: T;
  isFetching: boolean;
  isError: boolean;
}

const initialState: IAPIResponse<{ access_token: string }> = {
  message: "",
  isFetching: false,
  isError: false,
  data: {
    access_token: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.pending, (state, action) => {
        return { ...state, isFetching: true };
      })
      .addCase(LoginAsync.fulfilled, (state, action) => {
        return {
          ...state,
          isFetching: false,
          isError: false,
          data: action.payload,
          message: "User successfully login!",
        };
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload as string,
          isFetching: false,
          isError: true,
        };
      });
  },
});

export default authSlice.reducer;
