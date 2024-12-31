import { createSlice } from "@reduxjs/toolkit";
import { FindAllEventsDto } from "../../../navigation/screens/events/type";
import { fetchAllEventsAsync } from "./events.effect";
import { IAPIResponse } from "../auth/auth.slice";

const initialState: IAPIResponse<FindAllEventsDto[]> = {
  data: [],
  isError: false,
  isFetching: false,
};
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllEventsAsync.pending, (state, action) => {
        return { ...state, isFetching: true };
      })
      .addCase(fetchAllEventsAsync.fulfilled, (state, action) => {
        return { ...state, isFetching: false, data: action.payload };
      })
      .addCase(fetchAllEventsAsync.rejected, (state, action) => {
        return { ...state, isError: true, message: action.payload as string };
      });
  },
});

export default eventSlice.reducer;
