import axios from "axios";

//create new service

export const createService = (profession, navigate) => async (dispatch) => {
  dispatch({ type: "ADD_SERVICE_LOADING" });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/service/addservice",
      { profession },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "ADD_SERVICE_SUCCESS", payload: response.data });
    navigate("/profile");
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_SERVICE_FAIL", payload: error });
  }
};

export const getCUrrentService = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "GET_CURRENT_SERVICE_LOADING" });
  try {
    const response = await axios.get(
      "http://localhost:5000/api/service/currentservice",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_CURRENT_SERVICE_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_CURRENT_SERVICE_FAIL", payload: error });
  }
};

export const uploadImages = (images) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "UPLOAD_MULTIPLE_IMAGES_LOADING" });
  try {
    const response = await axios.put(
      "http://localhost:5000/api/service/uploadimages",
      images,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "UPLOAD_MULTIPLE_IMAGES_SUCCESS",
      payload: response.data,
    });
    dispatch(getCUrrentService(token));
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_MULTIPLE_IMAGES_FAIL", payload: error });
  }
};
