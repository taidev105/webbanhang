import React from 'react';

import { Skeleton } from '@material-ui/lab';
const FilterSeketon = () => {
  return (
    <ul className='filter-list'>
      {Array.from({ length: 7 }, (_, i) => i).map((product, index) => {
        return (
          <li className='category-filter-item filter-item' key={index}>
            <Skeleton
              variant='text'
              animation='wave'
              height={15}
              width={100 + index * 10}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default FilterSeketon;
