import React from 'react';
import Filter from '../filter/Filter';
import './filterMini.scss';
import { useButtonContext } from '../../context/button_context';

const FilterMini = () => {
  const { isFilterMiniOpen, miniAction } = useButtonContext();

  const action = () => {
    miniAction('close', 'FilterMini');
  };
  return (
    <div className={isFilterMiniOpen ? 'filter-mini openned' : 'filter-mini'}>
      <div className=' filter-mini-header-title'>
        <h3>FILTER</h3>
      </div>
      <div className='filter-wrapper'>
        <Filter />
        <div className='clear-filter-btn-wrapper margin-top-10'>
          <button onClick={action} className='clear-filter-btn '>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMini;
