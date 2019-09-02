import { ActionType } from "./actionType";

export const addToCart = (product, count) => ({
  type: ActionType.ADD_TO_CART,
  payload: product,
  quantity: count
});
