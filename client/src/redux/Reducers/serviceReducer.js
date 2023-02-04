import {
  ADD_SERVICE_FAIL,
  ADD_SERVICE_LOADING,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_LOADING,
  GET_ALL_SERVICES_FAIL,
  GET_ALL_SERVICES_LOADING,
  GET_ALL_SERVICES_SUCCESS,
  GET_CURRENT_SERVICE_FAIL,
  GET_CURRENT_SERVICE_loading,
  GET_CURRENT_SERVICE_SUCCESS,
  UPLOAD_MULTIPLE_IMAGES_FAIL,
  UPLOAD_MULTIPLE_IMAGES_LOADING,
  UPLOAD_MULTIPLE_IMAGES_SUCCESS,
} from "../Consts/serviceConsts";

const initialState = {
  error: [],
  currentService: {},
  allServices: [],
  loading: false,
};

export const serviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SERVICE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_SERVICE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_CURRENT_SERVICE_loading:
      return {
        ...state,
        loading: true,
      };
    case GET_CURRENT_SERVICE_SUCCESS:
      return { ...state, loading: false, currentService: payload };
    case GET_CURRENT_SERVICE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPLOAD_MULTIPLE_IMAGES_LOADING:
      return { ...state, loading: true };
    case UPLOAD_MULTIPLE_IMAGES_FAIL:
      return { ...state, errors: payload, loading: false };
    case UPLOAD_MULTIPLE_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_IMAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_IMAGE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_ALL_SERVICES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_SERVICES_SUCCESS: {
      return { ...state, allServices: payload.data, loading: false };
    }
    case GET_ALL_SERVICES_FAIL: {
      return { ...state, error: payload, loading: false };
    }

    default:
      return state;
  }
};
