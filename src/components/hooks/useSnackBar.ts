import { useDispatch, useSelector } from "react-redux";
import {
  setSnackbarProps as dispatchSnackbarProps,
  CustomSnackBarProps,
} from "./../../store/slices/snackBar/snackbar.slice";
import { useCallback } from "react";
import { snackBarSelector } from "../../store/slices/snackBar/snackbar.selector";

export type APIResponse<T> = {
  [x: string]: any;
  data: T;
  message: string;
  status?: number;
  statusText?: string;
};

export type OptionalExceptFor<T, TRequired extends keyof T> = Pick<
  T,
  TRequired
> &
  Partial<T>;

export type PartialPick<T, F extends keyof T> = Omit<T, F> &
  Partial<Pick<T, F>>;

export const useSnackBar = () => {
  const dispatch = useDispatch();
  const snackbarProps = useSelector(snackBarSelector);

  const setSnackbarProps = useCallback(
    ({
      visible = true,
      ...props
    }: OptionalExceptFor<CustomSnackBarProps, "children">) => {
      dispatch(dispatchSnackbarProps({ ...props, visible }));
    },
    [dispatch]
  );

  const onDismissSnackBar = () => {
    setSnackbarProps({
      visible: false,
      children: "dismiss",
    });
  };

  return {
    setSnackbarProps,
    snackbarProps,
    onDismissSnackBar,
  };
};
