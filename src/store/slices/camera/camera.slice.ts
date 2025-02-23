import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: "" };
export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setImage(state, action) {
      return { ...state, data: action.payload };
    },

    resetImage(state) {
      return { ...state, data: "" };
    },
  },
});

export const { setImage, resetImage } = cameraSlice.actions;

export default cameraSlice.reducer;
