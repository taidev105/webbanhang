import React from 'react';
import './loginMini.scss';
import { useButtonContext } from '../../context/button_context';
import RotateCloseBtn from '../rotateCloseBtn/RotateCloseBtn';
import { Link } from 'react-router-dom';
const LoginMini = () => {
  const { isMiniLoginOpen, miniAction } = useButtonContext();
  const action = () => {
    miniAction('close', 'MiniLogin');
  };
  return (
    <div
      className={
        isMiniLoginOpen ? 'login-mini login-mini-openned' : 'login-mini'
      }
    >
      <div className='mini-wrap'>
        <div className=' mini-header-title mini-header-title-shadow'>
          <h3>LOGIN</h3>
          <RotateCloseBtn action={action} />
        </div>
        <div className='mini-wrap-2'>
          <div className='content-login-wrapper'>
            <form action='' className='content-login'>
              <div
                className={
                  isMiniLoginOpen
                    ? 'content-login-form-row userName openned'
                    : 'content-login-form-row userName'
                }
              >
                <label htmlFor='userName'>User name</label>
                <input type='text' id='userName' />
              </div>
              <div
                className={
                  isMiniLoginOpen
                    ? 'content-login-form-row password openned'
                    : 'content-login-form-row password'
                }
              >
                <label htmlFor='password'>Password</label>
                <input type='text' id='password' />
              </div>
              <button
                className={
                  isMiniLoginOpen ? 'button_primary openned' : 'button_primary'
                }
              >
                SIGN IN
              </button>
              <div
                className={
                  isMiniLoginOpen
                    ? 'link-acc-wrapper openned'
                    : 'link-acc-wrapper'
                }
              >
                <p className='login-link-acc'>
                  New customer?
                  <Link to='#'>Create your account</Link>
                </p>
                <p className='login-link-acc'>
                  Lost password?
                  <Link to='#'>Recover password</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMini;
