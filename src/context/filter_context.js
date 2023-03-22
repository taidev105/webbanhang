import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import { useProductContext } from '../context/product_context';
import {
  SORT_PRODUCTS,
  UPDATE_SORT_OPTION,
  UPDATE_FILTER,
  FILTER_PRODUCTS,
  UPDATE_FILTER_MENU,
  SET_CURRENT_MIN_PRICE,
  SET_CURRENT_MAX_PRICE,
  CLEAR_ALL_FILTERS,
} from '../actions';

const FilterContext = React.createContext();
const initialState = {
  category: [],
  products: [],
  color: [],
  size: [],
  filteredProducts: [],
  sortOption: 'lowest',
  filter: {
    category: 'All',
    search: '',
    minPrice: 0,
    maxPrice: 0,
    currentMinPrice: 0,
    currentMaxPrice: 0,
    color: 'All',
    size: 'All',
    sale: false,
    brand: 'All',
  },
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, category, color, size, brand } = useProductContext();

  useEffect(() => {
    dispatch({
      type: 'LOAD_PRODUCTS',
      payload: { products, category, color, size, brand },
    }); // eslint-disable-next-line
  }, [products]);
  useEffect(() => {
    dispatch({
      type: FILTER_PRODUCTS,
    });
    dispatch({
      type: SORT_PRODUCTS,
    });
    dispatch({ type: UPDATE_FILTER_MENU }); // eslint-disable-next-line
  }, [state.sortOption, state.filter, products]);

  const sortUpdate = (e) => {
    dispatch({
      type: UPDATE_SORT_OPTION,
      payload: { sortOption: e.target.value },
    });
  };
  const sortUpdateMini = (e) => {
    dispatch({
      type: UPDATE_SORT_OPTION,
      payload: { sortOption: e.target.dataset.sort },
    });
  };

  const filterUpdate = (e) => {
    const filterName = e.target.name;

    if (filterName === 'search') {
      dispatch({
        type: UPDATE_FILTER,
        payload: { name: filterName, value: e.target.value },
      });
    }
    if (filterName === 'category') {
      dispatch({
        type: UPDATE_FILTER,
        payload: { name: filterName, value: e.target.dataset.category },
      });
    }
    if (filterName === 'MINIcategory') {
      dispatch({
        type: UPDATE_FILTER,
        payload: { name: 'category', value: e.target.value },
      });
    }
    if (filterName === 'brand') {
      dispatch({
        type: UPDATE_FILTER,
        payload: { name: filterName, value: e.target.dataset.brand },
      });
    }
    if (filterName === 'color') {
      dispatch({
        type: UPDATE_FILTER,
        payload: { name: filterName, value: e.target.dataset.color },
      });
    }
    if (filterName === 'size') {
      dispatch({
        type: UPDATE_FILTER,
        payload: { name: filterName, value: e.target.dataset.size },
      });
    }
  };
  const filterCategoryUpdate = (filterValue, anotherFilterValue = null) => {
    clearAllFilter();
    dispatch({
      type: UPDATE_FILTER,
      payload: { name: 'category', value: filterValue },
    });
    if (anotherFilterValue) {
      dispatch({
        type: UPDATE_FILTER,
        payload: { name: 'sale', value: true },
      });
    }
  };
  const filterBrandUpdate = (filterValue) => {
    clearAllFilter();
    dispatch({
      type: UPDATE_FILTER,
      payload: { name: 'brand', value: filterValue },
    });
  };
  const setCurrentMinPrice = (value) => {
    dispatch({ type: SET_CURRENT_MIN_PRICE, payload: { value: value } });
  };
  const setCurrentMaxPrice = (value) => {
    dispatch({ type: SET_CURRENT_MAX_PRICE, payload: { value: value } });
  };

  const clearAllFilter = () => {
    dispatch({ type: CLEAR_ALL_FILTERS });
  };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        sortUpdate,
        sortUpdateMini,
        filterUpdate,
        clearAllFilter,
        setCurrentMinPrice,
        setCurrentMaxPrice,
        filterCategoryUpdate,
        filterBrandUpdate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export const useFilterContext = () => {
  return useContext(FilterContext);
};
