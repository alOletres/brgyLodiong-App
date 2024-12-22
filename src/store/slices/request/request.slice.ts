import { createSlice } from "@reduxjs/toolkit";
import { FindAllRequestsDto } from "../../../navigation/screens/request/type";
import { IAPIResponse } from "../auth/auth.slice";
import { createRequestAsync } from "./request.effects";

const initialState: IAPIResponse<FindAllRequestsDto[]> = {
  data: [],
  message: "",
  isFetching: false,
  isError: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createRequestAsync.pending, (state, action) => {
        return { ...state, isFetching: true };
      })
      .addCase(createRequestAsync.fulfilled, (state, action) => {
        return {
          ...state,
          isFetching: false,
          message: "Request successfully added!",
        };
      })
      .addCase(createRequestAsync.rejected, (state, action) => {
        return { ...state, isError: true, message: action.payload as string };
      });
  },
});

export default requestSlice.reducer;
