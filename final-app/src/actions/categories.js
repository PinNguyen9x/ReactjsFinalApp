import { ActionType } from "./actionType";
import categoriesApi from "../Api/categoriesApi";

export const updateCategoryType = categoryType => {
  return {
    type: ActionType.UPDATE_NEW_CATEGORYTYPE,
    payload: categoryType
  };
};

export const getCategoryList = () => {
  return async dispatch => {
    try {
      // Start fetching
      dispatch({ type: ActionType.FETCH_CATEGORY_LIST });
      // Process success returned
      const filter = {
        limit: 4,
        skip: 0,
        order: "name asc",
        where: {
          name: { neq: null }
        }
      };
      const params = {
        filter: JSON.stringify(filter)
      };
      const categoriesResponse = await categoriesApi.getAll(params);
      const { body } = categoriesResponse;
      dispatch({
        type: ActionType.FETCH_CATEGORY_LIST_SUCCESS,
        payload: body
      });
    } catch (e) {
      // Handle error
      dispatch({
        type: ActionType.FETCH_CATEGORY_LIST_FAILED,
        payload: e.message
      });
    }
  };
};
