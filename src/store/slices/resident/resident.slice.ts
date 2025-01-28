import { createSlice } from "@reduxjs/toolkit";
import { FindAllRequestsDto } from "../../../navigation/screens/request/type";
import { IAPIResponse } from "../auth/auth.slice";
import { createResidentAsync } from "./resident.effects";

const initialState: IAPIResponse<FindAllRequestsDto[]> = {
  data: [],
  message: "",
  isFetching: false,
  isError: false,
};

const residentSlice = createSlice({
  name: "resident",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createResidentAsync.pending, (state, action) => {
        return { ...state, isFetching: true };
      })
      .addCase(createResidentAsync.fulfilled, (state, action) => {
        return {
          ...state,
          isFetching: false,
          message: "Successfully created!",
        };
      })
      .addCase(createResidentAsync.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload
            ? (action.payload as string)
            : (action.error.message as string),
        };
      });
  },
});

export default residentSlice.reducer;
