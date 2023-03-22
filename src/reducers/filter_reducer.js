import { getUnique, getUniqueObj } from '../utils/helper';

import {
  SORT_PRODUCTS,
  LOAD_PRODUCTS,
  UPDATE_SORT_OPTION,
  UPDATE_FILTER,
  FILTER_PRODUCTS,
  UPDATE_FILTER_MENU,
  SET_CURRENT_MIN_PRICE,
  SET_CURRENT_MAX_PRICE,
  CLEAR_ALL_FILTERS,
} from '../actions';

const button_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const arrayPrice = action.payload.products.reduce((acc, cur) => {
      return acc.concat(cur.price);
    }, []);
    return {
      ...state,
      products: [...action.payload.products],
      filteredProducts: [...action.payload.products],
      category: [...action.payload.category],
      color: [...action.payload.color],
      size: [...action.payload.size],
      brand: [...action.payload.brand],
      filter: {
        ...state.filter,
        maxPrice: Math.max(...arrayPrice),
        currentMaxPrice: Math.max(...arrayPrice),
      },
    };
  }
  if (action.type === UPDATE_SORT_OPTION) {
    return { ...state, sortOption: action.payload.sortOption };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sortOption, filteredProducts } = state;
    let tempProducts = [...filteredProducts];

    if (sortOption === 'lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sortOption === 'highest') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sortOption === 'A-Z') {
      tempProducts = tempProducts.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
        var nameB = b.name.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
    }
    if (sortOption === 'Z-A') {
      tempProducts = tempProducts.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
        var nameB = b.name.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        // name trùng nhau
        return 0;
      });
    }
    return {
      ...state,
      filteredProducts: tempProducts,
    };
  }
  if (action.type === UPDATE_FILTER) {
    return {
      ...state,
      filter: { ...state.filter, [action.payload.name]: action.payload.value },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { products } = state;
    let tempfilterProduct = [...products];
    const {
      search,
      currentMinPrice,
      currentMaxPrice,
      maxPrice,
      category,
      color,
      size,
      sale,
      brand,
    } = state.filter;
    if (currentMinPrice > 0 || currentMaxPrice < maxPrice) {
      tempfilterProduct = tempfilterProduct.filter(
        (product) =>
          product.price > currentMinPrice && product.price < currentMaxPrice
      );
    }
    if (search) {
      tempfilterProduct = tempfilterProduct.filter((product) => {
        return product.name.toLowerCase().startsWith(search);
      });
    }
    if (category !== 'All') {
      tempfilterProduct = tempfilterProduct.filter((product) => {
        return product.category.find((item) => {
          return item === category;
        });
      });
    }
    if (brand !== 'All') {
      tempfilterProduct = tempfilterProduct.filter((product) => {
        return product.brand === brand;
      });
    }
    if (color !== 'All') {
      tempfilterProduct = tempfilterProduct.filter((product) => {
        return product.colorImg.some((item) => item.colorCode === color);
      });
    }
    if (size !== 'All') {
      tempfilterProduct = tempfilterProduct.filter((product) => {
        return product.size.some((item) => item === size);
      });
    }
    if (sale) {
      tempfilterProduct = tempfilterProduct.filter((product) => product.onSale);
    }

    return {
      ...state,
      filteredProducts: tempfilterProduct,
    };
  }
  if (action.type === UPDATE_FILTER_MENU) {
    const { filteredProducts } = state;
    return {
      ...state,
      category: getUnique(filteredProducts, 'category'),
      color: getUniqueObj(filteredProducts, 'colorName'),
      size: getUnique(filteredProducts, 'size'),
    };
  }
  if (action.type === SET_CURRENT_MIN_PRICE) {
    return {
      ...state,
      filter: { ...state.filter, currentMinPrice: action.payload.value },
    };
  }
  if (action.type === SET_CURRENT_MAX_PRICE) {
    return {
      ...state,
      filter: { ...state.filter, currentMaxPrice: action.payload.value },
    };
  }
  if (action.type === CLEAR_ALL_FILTERS) {
    const arrayPrice = state.products.reduce((acc, cur) => {
      return acc.concat(cur.price);
    }, []);
    return {
      ...state,
      sortOption: 'lowest',
      filter: {
        category: 'All',
        search: '',
        minPrice: 0,
        currentMinPrice: 0,
        maxPrice: Math.max(...arrayPrice),
        currentMaxPrice: Math.max(...arrayPrice),
        color: 'All',
        size: 'All',
        brand: 'All',
        sale: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};
export default button_reducer;
