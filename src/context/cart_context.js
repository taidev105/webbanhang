import React, { useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/Cart_reducer';
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
import { useProductContext } from '../context/product_context';

const CartContext = React.createContext();
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(),
  amountTotal: 0,
  totalItem: 0,
  checkCart: false,
  cartAlertMess: { show: false, message: '', color: '', status: '' },
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    singleProduct,
    singleProductAction,
    tempSingleProduct,
    tempSingleProductAction,
  } = useProductContext();
  const addToCart = (id = null) => {
    const { colorIndex, size, itemCount } = singleProductAction;
    let newItemCount = itemCount;
    if (isNaN(itemCount)) {
      newItemCount = 1;
    }
    const productCart = {
      singleProduct: singleProduct,
      colorIndex: colorIndex,
      size: size,
      itemCount: newItemCount,
      //date.now là số milisecond , math.random phòng vc click 2 lần cùng nhau , chuyển sang hệ 36
      idCart: (Date.now() + Math.random()).toString(36),
      mess: { show: false, message: '', color: '' },
    };

    dispatch({
      type: ADD_TO_CART,
      payload: { productCart, id },
    });
  };
  //cart item
  const addToCartTSP = (id = null) => {
    const { colorIndex, size, itemCount } = tempSingleProductAction;

    let newItemCount = itemCount;
    if (isNaN(itemCount)) {
      newItemCount = 1;
    }
    const productCart = {
      singleProduct: tempSingleProduct,
      colorIndex: colorIndex,
      size: size,
      itemCount: newItemCount,
      //date.now là số milisecond , math.random phòng vc click 2 lần cùng nhau , chuyển sang hệ 36
      idCart: (Date.now() + Math.random()).toString(36),
      mess: { show: false, message: '', color: '' },
    };
    dispatch({
      type: ADD_TO_CART,
      payload: { productCart, id },
    });
  };
  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  // total cart
  const totalCart = () => {
    dispatch({ type: CART_TOTAL });
  };
  //toggle item of cart
  const toggleItemCart = (idCart, value) => {
    dispatch({ type: TOGGLE_ITEM_CART, payload: { idCart, value } });
  };
  // no parameter can get e(event)
  const setItemCartByInput = (e) => {
    let value = e.target.value;
    const idCart = e.target.dataset.idcart;
    if (value !== '') {
      value = parseInt(value);
    }
    if (value === '') {
      value = '';
    }
    dispatch({ type: TOGGLE_ITEM_CART, payload: { idCart, value } });
  };
  //remove item of cart
  const removeItemCart = (idCart) => {
    dispatch({ type: REMOVE_ITEM_CART, payload: { idCart } });
  };
  //show and hide alert mess of cart
  const showCartmessage = (status, mess, color) => {
    dispatch({ type: SHOW_CART_ALTER_MESS, payload: { status, mess, color } });
  };
  const hiddenCartAlertMess = () => {
    dispatch({ type: HIDDEN_CART_ALTER_MESS });
  };
  //show and hide alert mess of cart item
  const hiddenCartItemMess = (idCart) => {
    dispatch({ type: HIDDEN_CART_ITEM_MESS, payload: { idCart } });
  };
  const checkcart = () => {
    dispatch({ type: CHECK_CART });
  };
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    totalCart();
    checkcart();
    // eslint-disable-next-line
  }, [state.cart]);

  useEffect(() => {
    if (state.cartAlertMess.show) {
      setTimeout(() => {
        hiddenCartAlertMess();
      }, 1500);
    } // eslint-disable-next-line
  }, [state.cartAlertMess.show]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        toggleItemCart,
        setItemCartByInput,
        removeItemCart,
        showCartmessage,
        hiddenCartItemMess,
        addToCartTSP,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
