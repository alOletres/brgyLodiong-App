import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { fetchRequestByUserAsync } from "../../../store/slices/request/request.effects";
import { decodeToken } from "../../../lib/tokenStorage";
import { FindAllRequestsDto } from "./type";

import { selectRequest } from "../../../store/slices/request/request.selector";
import { ICustomListSection } from "../../../components/ListSection";
import moment from "moment";

export const useHooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setSnackbarProps } = useSnackBar();
  const { data } = useSelector(selectRequest);

  const fetchRequestByUser = async () => {
    try {
      const { id } = (await decodeToken()) as { id: number };

      await dispatch(fetchRequestByUserAsync(id)).unwrap(); // Use .unwrap() to handle errors cleanly
    } catch (err) {
      const error = err as any;
      setSnackbarProps({
        children: error?.message || "Something went wrong, Try again!",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchRequestByUser();
  }, [dispatch]);

  const dataSource = useMemo((): ICustomListSection[] | undefined => {
    return data?.map((value: FindAllRequestsDto): ICustomListSection => {
      return {
        content: [
          {
            title: value.requestType,
            description: value.purpose,
            date:
              value.status === "COMPLETED"
                ? moment(value.dateCompleted).format("YYYY/MM/DD")
                : moment(value.dateRequested).format("YYYY/MM/DD"),
            status: value.status,
            icon: "",
          },
        ],
      };
    });
  }, [data]);

  return {
    dataSource,
  };
};
