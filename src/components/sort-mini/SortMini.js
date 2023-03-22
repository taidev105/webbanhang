import React from 'react';
import './sortMini.scss';
import { useButtonContext } from '../../context/button_context';
import RotateCloseBtn from '../rotateCloseBtn/RotateCloseBtn';
import { sortMini } from '../../utils/data';
import { useFilterContext } from '../../context/filter_context';
const SortMini = () => {
  const { isSortMiniOpen, miniAction } = useButtonContext();
  const { sortUpdateMini, sortOption } = useFilterContext();
  const action = () => {
    miniAction('close', 'SortMini');
  };

  return (
    <div className={isSortMiniOpen ? 'sort-mini openned' : 'sort-mini'}>
      <div className='filter-mini-header-title'>
        <h3>FILTER</h3>
        <RotateCloseBtn action={action} />
      </div>
      <div className='search-filter-wrapper filter-wrapper padding-20px'>
        <div className='filter-title'>
          <h5>Sort by</h5>
        </div>
        <ul className='sort-list'>
          {sortMini.map((item, index) => {
            return (
              <li className='sort-item' key={index}>
                <button
                  className={
                    item.data === sortOption
                      ? 'sort-item-btn active'
                      : 'sort-item-btn'
                  }
                  data-sort={item.data}
                  onClick={sortUpdateMini}
                >
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={action} className='filter-mini-btn button_primary'>
          Sort
        </button>
      </div>
    </div>
  );
};

export default SortMini;
