import React, { useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/products_reducer';
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_BEGIN,
  ADD_BLOG,
  ADD_COLLECTION,
  ADD_BANNER,
  ADD_BLOG_HOME,
  ADD_SLIDESHOW,
  GET_SINGLE_PRODUCT,
  INCREASE_INDEX_IMG,
  DECREASE_INDEX_IMG,
  SET_INDEX_IMG,
  SET_COLOR_INDEX,
  CLEAR_SINGLE_ACTION,
  SET_SIZE_PRODUCT,
  SET_ITEM_COUNT,
  SET_ID_CART,
  RANDOM_PRODUCT,
  SET_VIEWED_PRODUCT,
  UPDATE_WISHLISH,
  HIDDEN_PRODUCT_ALTER_MESS,
  GET_SINGLE_PRODUCT_TSP,
  INCREASE_INDEX_IMG_TSP,
  DECREASE_INDEX_IMG_TSP,
  SET_INDEX_IMG_TSP,
  SET_COLOR_INDEX_TSP,
  CLEAR_SINGLE_ACTION_TSP,
  SET_SIZE_PRODUCT_TSP,
  SET_ITEM_COUNT_TSP,
  SET_ID_CART_TSP,
  HIDDEN_PRODUCT_ALTER_MESS_TSP,
  ADD_ABOUT,
  ADD_ABOUT_VIDEO,
} from '../actions';
import { useUserContext } from '../context/user_context';
const ProductContext = React.createContext();
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.REACT_APP_PERSON_KEY }).base(
  process.env.REACT_APP_BASIC_KEY
);
const getLocalStorage = () => {
  let singleProduct = localStorage.getItem('singleProduct');
  if (singleProduct) {
    return JSON.parse(localStorage.getItem('singleProduct'));
  } else {
    return {};
  }
};
const getTempLocalStorage = () => {
  let tempSingleProduct = localStorage.getItem('tempSingleProduct');
  if (tempSingleProduct) {
    return JSON.parse(localStorage.getItem('tempSingleProduct'));
  } else {
    return {};
  }
};
const initialState = {
  slideShows: [],
  blogHomes: [],
  banners: [],
  blogs: [],
  about: [],
  collections: [],
  category: [],
  brand: [],
  products: [],
  color: [],
  size: [],
  aboutVideo: [],
  productsLoading: false,
  productsError: false,
  trendingProducts: [],
  saleProducts: [],
  viewedProducts: [],
  recommendProducts: [],
  wishProducts: [],
  singleProduct: getLocalStorage(),
  singleProductAction: {
    colorIndex: '',
    indexIMG: 0,
    size: '',
    itemCount: 1,
    idCart: '',
    productAlertMess: { show: false, message: '', color: '' },
  },
  tempSingleProduct: getTempLocalStorage(),
  tempSingleProductAction: {
    colorIndex: '',
    indexIMG: 0,
    size: '',
    itemCount: 1,
    idCart: '',
    productAlertMess: { show: false, message: '', color: '' },
  },
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { wishList } = useUserContext();
  const getProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const [res, resColor] = await Promise.all([
        base('product').select({}).firstPage(),
        base('productColorImg').select({}).firstPage(),
      ]);
      // const res = await base('product').select({}).firstPage();
      // const resColor = await base('productColorImg').select({}).firstPage();
      const products = res.map((item) => {
        const newColorImg = item.fields.colorImg.map((color) => {
          return resColor.find((colorin) => colorin.id === color).fields;
        });
        //create array indexImg
        let check = -1;
        let check1 = -1;
        const a = newColorImg.map((item) => {
          const indexImgArray = Array.from(
            { length: item.img.length },
            (_, i) => {
              check = check + 1;
              return check;
            }
          );
          const newImg = item.img.map((imgItem, index) => {
            check1 = check1 + 1;
            return { ...imgItem, indexImgItem: check1 };
          });
          return { ...item, indexImg: indexImgArray, img: newImg };
        });

        const AllOfImg = newColorImg.reduce((acc, cur) => {
          return acc.concat(cur.img);
        }, []);
        return {
          ...item.fields,
          colorImg: a,
          id: item.id,
          imgAmount: check,
          AllOfImg: AllOfImg,
        };
      });
      randomProduct(products, 'viewedProducts');
      randomProduct(products, 'recommendProducts');
      updateWishList(products);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: { products } });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  const getTable = async (table, type, size = 'large') => {
    const res = await base(table).select({}).firstPage();
    const value = res.map((record) => {
      return {
        ...record.fields,
        img: record.fields.img[0].thumbnails[size].url,
        id: record.id,
      };
    });
    dispatch({ type: type, payload: { value } });
  };

  const getSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT, payload: { id } });
    cleartSingleProductAction();
  };

  const switchIMG = (value) => {
    if (Object.keys(state.singleProduct).length > 0) {
      if (value === 'inc') {
        dispatch({ type: INCREASE_INDEX_IMG });
      } else if (value === 'dec') {
        dispatch({ type: DECREASE_INDEX_IMG });
      } else {
        dispatch({ type: SET_INDEX_IMG, payload: { value } });
      }
    }
  };
  const setColorFollowIndex = () => {
    dispatch({ type: SET_COLOR_INDEX });
  };
  const cleartSingleProductAction = () => {
    dispatch({ type: CLEAR_SINGLE_ACTION });
  };
  const setSingleProductSize = (value, addTo) => {
    dispatch({ type: SET_SIZE_PRODUCT, payload: { value, addTo } });
  };
  const setItemCount = (value) => {
    dispatch({ type: SET_ITEM_COUNT, payload: { value } });
  };
  // no parameter can get e(enent)
  const setItemCountByInput = (e) => {
    let value = parseInt(e.target.value);
    dispatch({ type: SET_ITEM_COUNT, payload: { value } });
  };
  const setIdCart = (value) => {
    dispatch({ type: SET_ID_CART, payload: { value } });
  };

  // tempSingleProduct
  const getSingleProductTSP = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_TSP, payload: { id } });
    cleartSingleProductActionTSP();
  };

  const switchIMGTSP = (value) => {
    if (Object.keys(state.tempSingleProduct).length > 0) {
      if (value === 'inc') {
        dispatch({ type: INCREASE_INDEX_IMG_TSP });
      } else if (value === 'dec') {
        dispatch({ type: DECREASE_INDEX_IMG_TSP });
      } else {
        dispatch({ type: SET_INDEX_IMG_TSP, payload: { value } });
      }
    }
  };
  const setColorFollowIndexTSP = () => {
    dispatch({ type: SET_COLOR_INDEX_TSP });
  };
  const cleartSingleProductActionTSP = () => {
    dispatch({ type: CLEAR_SINGLE_ACTION_TSP });
  };
  const setSingleProductSizeTSP = (value) => {
    dispatch({ type: SET_SIZE_PRODUCT_TSP, payload: { value } });
  };
  const setItemCountTSP = (value) => {
    dispatch({ type: SET_ITEM_COUNT_TSP, payload: { value } });
  };
  // no parameter can get e(enent)
  const setItemCountByInputTSP = (e) => {
    let value = parseInt(e.target.value);
    dispatch({ type: SET_ITEM_COUNT_TSP, payload: { value } });
  };
  const setIdCartTSP = (value) => {
    dispatch({ type: SET_ID_CART_TSP, payload: { value } });
  };

  const randomProduct = (products, name) => {
    dispatch({ type: RANDOM_PRODUCT, payload: { products, name } });
  };
  const setViewedProduct = () => {
    dispatch({ type: SET_VIEWED_PRODUCT });
  };
  const updateWishList = (products) => {
    dispatch({ type: UPDATE_WISHLISH, payload: { wishList, products } });
  };

  useEffect(() => {
    if (state.singleProductAction.productAlertMess.show) {
      setTimeout(() => {
        dispatch({ type: HIDDEN_PRODUCT_ALTER_MESS });
      }, 1000);
    }
    // eslint-disable-next-line
  }, [state.singleProductAction.productAlertMess.show]);

  useEffect(() => {
    if (state.tempSingleProductAction.productAlertMess.show) {
      setTimeout(() => {
        dispatch({ type: HIDDEN_PRODUCT_ALTER_MESS_TSP });
      }, 1000);
    } // eslint-disable-next-line
  }, [state.tempSingleProductAction.productAlertMess]);

  //wishlist change
  useEffect(() => {
    updateWishList(state.products); // eslint-disable-next-line
  }, [wishList]);

  //
  useEffect(() => {
    //when indexIMG change , find color follow product
    setColorFollowIndex(); // eslint-disable-next-line
  }, [state.singleProductAction.indexIMG]);
  useEffect(() => {
    //when indexIMG change , find color follow product
    setColorFollowIndexTSP(); // eslint-disable-next-line
  }, [state.tempSingleProductAction.indexIMG]);

  useEffect(() => {
    localStorage.setItem('singleProduct', JSON.stringify(state.singleProduct));
    if (Object.keys(state.singleProduct).length > 0) {
      setSingleProductSize(state.singleProduct.size[0]);
    }
    randomProduct(state.products, 'recommendProducts');
    setViewedProduct(); // eslint-disable-next-line
  }, [state.singleProduct]);

  useEffect(() => {
    localStorage.setItem(
      'tempSingleProduct',
      JSON.stringify(state.tempSingleProduct)
    );
    if (state.temSingleProduct) {
      setSingleProductSizeTSP(state.temSingleProduct.size[0]);
    } // eslint-disable-next-line
  }, [state.tempSingleProduct]);

  useEffect(() => {
    getProducts();
    getTable('slide', ADD_SLIDESHOW, 'full');
    getTable('collection', ADD_COLLECTION, 'full');
    getTable('blog', ADD_BLOG);
    getTable('banner', ADD_BANNER);
    getTable('blog', ADD_BLOG_HOME);
    getTable('aboutVideo', ADD_ABOUT_VIDEO);
    getTable('about', ADD_ABOUT); // eslint-disable-next-line
  }, []);
  return (
    <ProductContext.Provider
      value={{
        ...state,
        getSingleProduct,
        switchIMG,
        setSingleProductSize,
        setItemCount,
        setItemCountByInput,
        setIdCart,
        getSingleProductTSP,
        switchIMGTSP,
        setColorFollowIndexTSP,
        setSingleProductSizeTSP,
        setItemCountTSP,
        setItemCountByInputTSP,
        setIdCartTSP,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
