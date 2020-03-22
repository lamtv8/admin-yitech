import { FETCH_VIDEO, UPDATE_VIDEO, LOCK_WEB } from "../actionType";

const initialState = {
  data: {
    count: undefined,
    next: undefined,
    previous: undefined,
    results: []
  },
  loading: false,
  web: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEO:
      return {
        ...state,
        loading: true
      };
    case UPDATE_VIDEO:
      return {
        ...state,
        data: {...action.payload.data},
        loading: false
      };
    case LOCK_WEB:
      return {
        ...state,
        data: {...action.payload.data},
        loading: false
      };
    default:
      return state;
  }
}
