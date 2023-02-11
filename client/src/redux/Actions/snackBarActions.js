// set snackbar

import { SET_SNACKBAR } from "../Consts/snackBarConsts";

export const setSnackbar =
  (snackbarOpen, snackbarType = "success", snackbarMessage = "") =>
  async (dispatch) => {
    dispatch({
      type: SET_SNACKBAR,
      payload: { snackbarOpen, snackbarType, snackbarMessage },
    });
  };
