import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { selectEvents } from "../../../store/slices/events/events.selector";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { fetchAllEventsAsync } from "../../../store/slices/events/events.effect";
import { ICustomCardProps } from "../../../components/Card";
import moment from "moment";

export const useHooks = () => {
  const { data } = useSelector(selectEvents);
  const { setSnackbarProps } = useSnackBar();
  const dispatch = useDispatch<AppDispatch>();

  const fetchAllEvents = async () => {
    try {
      await dispatch(fetchAllEventsAsync());
    } catch (err) {
      const error = err as any;
      setSnackbarProps({
        children: error?.message || "Something went wrong, Try again!",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, [dispatch]);

  const content = useMemo((): ICustomCardProps[] => {
    return data?.length
      ? data.map((value): ICustomCardProps => {
          return {
            title: value.eventName,
            icon: "calendar-star",
            content: [
              { title: "Description", description: value.description },
              { title: "Where", description: value.location },
              {
                title: "When",
                description: moment(value.eventDate).format("ll"),
              },
            ],
          };
        })
      : [];
  }, [data]);

  return { content };
};
