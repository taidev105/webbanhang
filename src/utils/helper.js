import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import React from 'react';

var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.REACT_APP_PERSON_KEY }).base(
  process.env.REACT_APP_BASIC_KEY
);

export const getProduct = async (set, filter) => {
  const res = await base('product').select({}).firstPage();
  const resColor = await base('productColorImg').select({}).firstPage();
  // console.log(
  //   res.map((e) => {
  //     const newColorImg = e.fields.colorImg.map((color) => {
  //       return resColor.find((colorin) => colorin.id === color).fields;
  //     });
  //     return { ...e.fields, colorImg: newColorImg, id: e.id };
  //   })
  // );
  const productList = res.map((e) => {
    const newColorImg = e.fields.colorImg.map((color) => {
      return resColor.find((colorin) => colorin.id === color).fields;
    });
    return { ...e.fields, colorImg: newColorImg, id: e.id };
  });
  set(productList.filter((product) => product[filter]));
};

export const getLinkApi = (table) => {
  return `https://api.airtable.com/v0/${process.env.REACT_APP_BASIC_KEY}/${table}?api_key=${process.env.REACT_APP_PERSON_KEY}`;
};
export const fetchData = async (table, set, sizeImg = 'large') => {
  const res = await base(table).select({}).firstPage();
  set(
    res.map((record) => {
      return {
        ...record.fields,
        img: record.fields.img[0].thumbnails[sizeImg].url,
        id: record.id,
      };
    })
  );
  return res.length;
};

//format price
export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};
//button next and prev
export const NextArrow = ({ onClick }) => {
  return (
    <div className='next-arrow' onClick={onClick}>
      <BiChevronRight />
    </div>
  );
};
export const PrevArrow = ({ onClick }) => {
  return (
    <div className='prev-arrow' onClick={onClick}>
      <BiChevronLeft />
    </div>
  );
};
// get unique array
export const getUnique = (products, value) => {
  // value is that you want to filter
  return [
    ...new Set(
      products.reduce((acc, cur) => {
        return acc.concat(cur[value]);
      }, [])
    ),
  ];
};
// get unique obj in array
export const getUniqueObj = (products, value) => {
  const array = products
    .reduce((acc, cur) => {
      return acc.concat(cur.colorImg);
    }, [])
    .map((color) => {
      return { colorName: color.colorName, colorCode: color.colorCode };
    });
  return [...new Map(array.map((item) => [item[value], item])).values()];
};
//scroll to spetical position top of page
export const scrollToTop = (top) => {
  window.scrollTo({
    top: top,
    behavior: 'smooth',
  });
};
