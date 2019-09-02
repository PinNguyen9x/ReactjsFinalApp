import { ActionType } from "../actions/actionType";

const initialState = {
  list: [],
  loading: false,
  error: null
};
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_NEW_CATEGORYTYPE: {
      return { ...state, categoryType: action.payload };
    }
    case ActionType.FETCH_CATEGORY_LIST: {
      return { ...state, loading: true };
    }
    case ActionType.FETCH_CATEGORY_LIST_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    case ActionType.FETCH_CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.payload
      };
    }
    default:
      return state;
  }
};

export default categoriesReducer;
