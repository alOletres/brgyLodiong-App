import { RootState } from "../..";

export const snackBarSelector = (state: RootState) =>
  state.snackbar.snackBarProps;
