import { ActionType } from "../actions/actionType";
const initialState = {
  list: [],
  total: 0,
  count: 0
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TO_CART: {
      // Check product if exist
      // Yes, increase quantity
      // No, add new item to list
      const cartItemList = [...state.list];
      const product = action.payload;
      const quantity = action.quantity;
      // Find cart item of selected product
      let cartIdx = cartItemList.findIndex(x => x.id === product.id);
      if (cartIdx >= 0) {
        if (quantity && quantity > 0) {
          cartItemList[cartIdx] = {
            ...cartItemList[cartIdx],
            quantity: cartItemList[cartIdx].quantity + quantity
          };
        } else {
          cartItemList[cartIdx] = {
            ...cartItemList[cartIdx],
            quantity: cartItemList[cartIdx].quantity + 1
          };
        }
      } else {
        let cartItem;
        if (quantity && quantity > 0) {
          cartItem = {
            product,
            id: product.id,
            quantity: quantity
          };
        } else {
          cartItem = {
            product,
            id: product.id,
            quantity: 1
          };
        }
        cartItemList.push(cartItem);
      }

      console.log("cartItemList", cartItemList);
      const countProduct = cartItemList.reduce(
        (countProduct, current) => countProduct + current.quantity,
        0
      );
      const totalProduct = cartItemList.reduce(
        (totalProduct, current) =>
          totalProduct + current.product.salePrice * current.quantity,
        0
      );
      return {
        ...state,
        count: countProduct,
        list: cartItemList,
        total: totalProduct
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
