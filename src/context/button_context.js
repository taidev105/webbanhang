import React, { useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/button_reducer';
import { MINI_ACTION, SET_IS_IN_PRODUCT_PAGE, SET_PAGE } from '../actions';
import { useFilterContext } from '../context/filter_context';
const ButtonContext = React.createContext();
const initialState = {
  isSideBarOpen: false,
  isMiniSearchOpen: false,
  isMiniLoginOpen: false,
  isMiniCartOpen: false,
  isFilterMiniOpen: false,
  isSortMiniOpen: false,
  isInProductPage: false,
  isSingleProductModalOpen: false,
  isCartModalOpen: false,
  isCartEditModalOpen: false,
  currentPage: '',
};

export const ButtonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { clearAllFilter } = useFilterContext();
  //name is mimi , action is open or close
  const miniAction = (action, name) => {
    dispatch({ type: MINI_ACTION, payload: { name, action } });
  };
  const setIsInProductPage = (value) => {
    dispatch({ type: SET_IS_IN_PRODUCT_PAGE, payload: { value } });
  };
  const setPage = (value) => {
    dispatch({ type: SET_PAGE, payload: { value } });
  };
  useEffect(() => {
    clearAllFilter(); // eslint-disable-next-line
  }, [state.isMiniSearchOpen]);
  return (
    <ButtonContext.Provider
      value={{ ...state, miniAction, setIsInProductPage, setPage }}
    >
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => {
  return useContext(ButtonContext);
};
