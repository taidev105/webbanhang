import {
  ADD_TO_CART,
  CLEAR_CART,
  CART_TOTAL,
  TOGGLE_ITEM_CART,
  REMOVE_ITEM_CART,
  HIDDEN_CART_ALTER_MESS,
  SHOW_CART_ALTER_MESS,
  HIDDEN_CART_ITEM_MESS,
  CHECK_CART,
} from '../actions';
const button_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    //id of edit product
    let { id } = action.payload;
    const { productCart } = action.payload;
    let newCart = state.cart;
    //có id nhưng id không trùng vs idcart trong cart nên k thay đổi
    //xóa id cần edit
    let newCartAlertMess = state.cartAlertMess;

    if (id) {
      if (!state.cart.some((itemCar) => itemCar.idCart === id)) {
        return { ...state };
      }
      newCart = newCart.filter((itemCart) => itemCart.idCart !== id);
    }
    //ktra xem trong cart có cartproduct trùng không
    const checkUnique = newCart.some((itemCart) => {
      return (
        itemCart.singleProduct.id === productCart.singleProduct.id &&
        itemCart.colorIndex === productCart.colorIndex &&
        itemCart.size === productCart.size
      );
    });
    //no id or id and  not unique
    if (checkUnique) {
      newCart = newCart.map((itemCart) => {
        if (
          itemCart.singleProduct.id === productCart.singleProduct.id &&
          itemCart.colorIndex === productCart.colorIndex &&
          itemCart.size === productCart.size
        ) {
          let newItemCount = itemCart.itemCount + productCart.itemCount;
          if (newItemCount > itemCart.singleProduct.stock) {
            newItemCount = itemCart.singleProduct.stock;
          }
          return {
            ...itemCart,
            itemCount: newItemCount,
          };
        }
        return itemCart;
      });
      if (id) {
        newCartAlertMess = {
          show: true,
          status: 'Success!',
          message: 'Edited cart and this item existed',
          //color #2fb886 is green
          color: '#2fb886',
        };
      }

      return { ...state, cart: newCart, cartAlertMess: newCartAlertMess };
    }
    // id and not unique
    if (id && !checkUnique) {
      newCartAlertMess = {
        show: true,
        status: 'Success!',
        message: 'Edited cart ',
        //color #2fb886 is green
        color: '#2fb886',
      };
      return {
        ...state,
        cart: [...newCart, productCart],
        cartAlertMess: newCartAlertMess,
      };
    }
    return { ...state, cart: [...state.cart, productCart] };
  }

  //caculate total cart
  if (action.type === CART_TOTAL) {
    const { amountTotal, totalItem } = state.cart.reduce(
      (total, cartItem) => {
        const { itemCount } = cartItem;
        const { price } = cartItem.singleProduct;
        total.amountTotal += price * itemCount;
        total.totalItem += itemCount;
        return total;
      },
      { amountTotal: 0, totalItem: 0 }
    );
    return { ...state, amountTotal, totalItem };
  }

  //toggle cart item
  if (action.type === TOGGLE_ITEM_CART) {
    const { idCart, value } = action.payload;
    //if another condition , newItemCount equal 0
    let newItemCount;
    //find cart item that need edit
    let newProductCart = state.cart.find(
      (cartItem) => cartItem.idCart === idCart
    );
    //
    let newMess = { show: false, message: '' };

    if (value === 'inc') {
      newItemCount = newProductCart.itemCount + 1;
      if (newItemCount > newProductCart.singleProduct.stock) {
        newItemCount = newProductCart.singleProduct.stock;
        newMess = {
          show: 'max',
          message: 'items is max',
          color: '#47a8f5',
        };
      }
      newProductCart = {
        ...newProductCart,
        itemCount: newItemCount,
        mess: newMess,
      };
    }

    if (value === 'dec') {
      newItemCount = newProductCart.itemCount - 1;
      if (newItemCount < 1) {
        newItemCount = 1;
      }
      newProductCart = { ...newProductCart, itemCount: newItemCount };
    }

    if (value === '') {
      newItemCount = 0;
      newProductCart = { ...newProductCart, itemCount: newItemCount };
    }

    if (typeof value === 'number') {
      newItemCount = value;
      if (newItemCount > newProductCart.singleProduct.stock) {
        newItemCount = newProductCart.singleProduct.stock;
        newMess = {
          show: 'max',
          color: '#47a8f5',
          message: 'items is max',
        };
      }
      if (newItemCount < 0) {
        newItemCount = 0;
      }
      newProductCart = {
        ...newProductCart,
        itemCount: newItemCount,
        mess: newMess,
      };
    }
    //change new cart item
    const newCart = state.cart.map((cartItem) => {
      if (cartItem.idCart === idCart) {
        return newProductCart;
      }
      return cartItem;
    });
    return { ...state, cart: newCart };
  }
  //clear cart
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
      cartAlertMess: {
        show: true,
        status: 'Success!',
        message: 'clear all cart items',
        //color #2fb886 is green
        color: '#2fb886',
      },
    };
  }
  //remove cart item
  if (action.type === REMOVE_ITEM_CART) {
    const newCart = state.cart.filter(
      (cartItem) => cartItem.idCart !== action.payload.idCart
    );
    return {
      ...state,
      cart: newCart,
      cartAlertMess: {
        show: true,
        status: 'Success!',
        message: 'Removed cart item',
        //color #2fb886 is green
        color: '#2fb886',
      },
    };
  }
  if (action.type === SHOW_CART_ALTER_MESS) {
    const { status, mess, color } = action.payload;
    return {
      ...state,
      cartAlertMess: {
        show: true,
        message: mess,
        color: color,
        status: status,
      },
    };
  }
  if (action.type === HIDDEN_CART_ALTER_MESS) {
    return {
      ...state,
      cartAlertMess: {
        show: false,
        message: '',
        color: '',
        status: '',
      },
    };
  }
  if (action.type === HIDDEN_CART_ITEM_MESS) {
    const newCart = state.cart.map((item) => {
      if (item.idcart === action.payload.idcart) {
        return { ...item, mess: { show: false, message: '' } };
      }
      return item;
    });
    return {
      ...state,
      cart: newCart,
    };
  }
  //checkCart
  if (action.type === CHECK_CART) {
    const check = state.cart.some((item) => item.itemCount < 1);

    if (state.cart.length > 0 && check === false) {
      return { ...state, checkCart: true };
    }
    return { ...state, checkCart: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};
export default button_reducer;
