import { FETCH_IMAGE, UPDATE_IMAGE, LOCK_USER, GET_USER } from "../actionType";

const initialState = {
  data: {
    count: undefined,
    next: undefined,
    previous: undefined,
    results: []
  },
  userData: {},
  loading: false
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_IMAGE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        data: action.payload.data,
        loading: false
      };
    case LOCK_USER:
      return {
        ...state,
        userData: action.payload.data,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        userData: action.payload.data,
        loading: false
      };
    default:
      return state;
  }
}
