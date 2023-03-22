import { MINI_ACTION, SET_IS_IN_PRODUCT_PAGE, SET_PAGE } from '../actions';

const button_reducer = (state, action) => {
  if (action.type === MINI_ACTION) {
    let openClose;
    // minichange is initial variable
    const miniChange = `is${action.payload.name}Open`;
    if (action.payload.action === 'open') {
      openClose = true;
    }
    if (action.payload.action === 'close') {
      openClose = false;
    }
    return { ...state, [miniChange]: openClose };
  }
  if (action.type === SET_IS_IN_PRODUCT_PAGE) {
    return { ...state, isInProductPage: action.payload.value };
  }
  if (action.type === SET_PAGE) {
    return { ...state, currentPage: action.payload.value };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default button_reducer;
