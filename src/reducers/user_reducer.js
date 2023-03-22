import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST,
  SET_USER,
  UPDATE_WISHLIST,
  HIDDEN_WISHLIST_ALTER_MESS,
} from '../actions';
const user_reducer = (state, action) => {
  if (action.type === ADD_TO_WISHLIST) {
    return {
      ...state,
      wishList: [...state.wishList, action.payload.idProduct],
    };
  }
  if (action.type === REMOVE_WISHLIST) {
    const newWishList = state.wishList.filter(
      (item) => item !== action.payload.idProduct
    );
    if (!action.payload.mess) {
      return {
        ...state,
        wishList: newWishList,
        wishListAlertMess: {
          show: true,
          status: 'Success!',
          message: 'Remove wishlist',
          //color #2fb886 is green
          color: '#2fb886',
        },
      };
    }
    return {
      ...state,
      wishList: newWishList,
    };
  }
  if (action.type === SET_USER) {
    let newUser;
    const { sub, nickname, picture } = action.payload.user;
    newUser = {
      sub,
      nickname,
      picture,
      wishList: action.payload.wishList,
    };

    if (!action.payload.user) {
      newUser = null;
    }
    return { ...state, myUser: newUser };
  }
  if (action.type === UPDATE_WISHLIST) {
    return { ...state, wishList: action.payload.wishList };
  }
  if (action.type === HIDDEN_WISHLIST_ALTER_MESS) {
    return {
      ...state,
      wishListAlertMess: {
        show: false,
        message: '',
        color: '',
        status: '',
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};
export default user_reducer;
