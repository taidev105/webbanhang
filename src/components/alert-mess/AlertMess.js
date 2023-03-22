import React from 'react';
import './alertMess.scss';
import { useCartContext } from '../../context/cart_context';
import { useUserContext } from '../../context/user_context';
const AlertMess = () => {
  const {
    cartAlertMess: { show, message, color, status },
  } = useCartContext();
  const {
    wishListAlertMess: {
      show: wishListShow,
      message: wishListMessage,
      color: wishListColor,
      status: wishListStatus,
    },
  } = useUserContext();
  return (
    <>
      <div
        className={show ? 'alert-mess hidden' : 'alert-mess'}
        style={{ backgroundColor: color, color: color }}
      >
        <span>
          <strong>{status}</strong> {message}
        </span>
      </div>
      <div
        className={wishListShow ? 'alert-mess hidden' : 'alert-mess'}
        style={{ backgroundColor: wishListColor, color: wishListColor }}
      >
        <span>
          <strong>{wishListStatus}</strong> {wishListMessage}
        </span>
      </div>
    </>
  );
};

export default AlertMess;
