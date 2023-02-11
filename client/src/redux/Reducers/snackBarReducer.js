import { SET_SNACKBAR } from "../Consts/snackBarConsts";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export const snackbarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SNACKBAR:
      return { ...state, ...payload };

    default:
      return initialState;
  }
};
