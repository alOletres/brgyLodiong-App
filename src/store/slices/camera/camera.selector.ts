import { RootState } from "../..";

export const selectCamera = (store: RootState) => store.camera.data;
