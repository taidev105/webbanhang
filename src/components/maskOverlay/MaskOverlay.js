import React, { useEffect } from 'react';
import './maskOverlay.scss';
import CloseIcon from '@material-ui/icons/Close';
import { useButtonContext } from '../../context/button_context';

const MaskOverlay = () => {
  const {
    isSideBarOpen,
    miniAction,
    isMiniSearchOpen,
    isMiniLoginOpen,
    isMiniCartOpen,
    isFilterMiniOpen,
    isSortMiniOpen,
    isSingleProductModalOpen,
  } = useButtonContext();
  const action = () => {
    miniAction('close', 'SideBar');
    miniAction('close', 'MiniSearch');
    miniAction('close', 'MiniLogin');
    miniAction('close', 'MiniCart');
    miniAction('close', 'FilterMini');
    miniAction('close', 'SortMini');
    miniAction('close', 'SingleProductModal');
  };
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        action();
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className={
        isSideBarOpen ||
        isMiniSearchOpen ||
        isMiniLoginOpen ||
        isMiniCartOpen ||
        isFilterMiniOpen ||
        isSortMiniOpen ||
        isSingleProductModalOpen
          ? 'mask-overlay mask-overlay-openned'
          : 'mask-overlay'
      }
      onClick={action}
    >
      {isSideBarOpen && (
        <button className='btn-close'>
          <CloseIcon />
        </button>
      )}
      {isFilterMiniOpen && (
        <button className='btn-close left-of-filter-mini'>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default MaskOverlay;
