import React from 'react';
import './footer.scss';
import Grid from '@material-ui/core/Grid';
import { footers, icons } from '../../utils/data';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import payment from '../../assets/footer/payment.webp';
import { VscLocation } from 'react-icons/vsc';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
const Footer = () => {
  const openClose = (e) => {
    e.target.parentElement.classList.toggle('menu-footer-wrapper_open');
  };
  return (
    <footer>
      <div className='footer-container'>
        <div className='content-footer'>
          <Grid container>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <aside className='menu-footer-wrapper'>
                <div className='menu-footer-title-wrapper' onClick={openClose}>
                  <h3 className='menu-footer-title none'>Get in touch</h3>
                  <div className='footer-btn-wrapper'>
                    <div className='footer-btn'>
                      <div className='line-1'>
                        <div className='line-2'></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='footer-contact menu-footer'>
                  <div className='menu'>
                    <p>
                      <Link to='#' className='footer-logo'>
                        <img src={logo} alt='empty'></img>
                      </Link>
                    </p>
                    <p>
                      <span className='icon-item-footer'>
                        <VscLocation />
                      </span>
                      <span>
                        184 Main Rd E, St Albans <br />
                        <span>VIC 3021, Australia</span>
                      </span>
                    </p>
                    <p>
                      <span className='icon-item-footer'>
                        <AiOutlineMail />
                      </span>
                      <span>
                        <a href='mailto:contact@company.com'>
                          contact@company.com
                        </a>
                      </span>
                    </p>
                    <p>
                      <span className='icon-item-footer'>
                        <AiOutlinePhone />
                      </span>
                      <span>+001 2233 456 </span>
                    </p>
                    <div className='social-footer-container'>
                      {icons.map((icon, index) => {
                        return (
                          <Link
                            to='#'
                            className={`social-icon ${icon.name}`}
                            key={index}
                          >
                            <span className='text-icon'>{icon.text}</span>
                            {icon.icon}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </aside>
            </Grid>
            {footers.map((footer, index) => {
              return (
                <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
                  <aside className='menu-footer-wrapper '>
                    <div
                      className='menu-footer-title-wrapper'
                      onClick={openClose}
                    >
                      <h3 className='menu-footer-title'>{footer.menu}</h3>
                      <div className='footer-btn-wrapper'>
                        <div className='footer-btn'>
                          <div className='line-1'>
                            <div className='line-2'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='menu-footer'>
                      <ul className='menu'>
                        {footer.items.map((item, index) => {
                          return (
                            <li className='item' key={index}>
                              <Link to={item.link}>{item.name}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </aside>
                </Grid>
              );
            })}
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <aside className='menu-footer-wrapper'>
                <div className='menu-footer-title-wrapper' onClick={openClose}>
                  <h3 className='menu-footer-title'>Newsletter Signup</h3>
                  <div className='footer-btn-wrapper'>
                    <div className='footer-btn'>
                      <div className='line-1'>
                        <div className='line-2'></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='menu-footer'>
                  <div className='menu'>
                    <p>
                      Subscribe to our newsletter and get 10% off your first
                      purchase
                    </p>
                    <div className='input-footer-wrapper'>
                      <input
                        type='email'
                        name='contact[email]'
                        placeholder='Your email address'
                        value=''
                        className='input-footer'
                        required='required'
                        readOnly
                      />
                      <button className='input-footer-btn'>Subscribe</button>
                    </div>
                    <p>
                      <img src={payment} alt='' />
                    </p>
                  </div>
                </div>
              </aside>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className='section-footer-bot'>
        <div className='footer-bot-container'>
          <div className='footer-bot-content'>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className='footer-bot-store-name'>
                  Copyright © 2021 <span>Kalles</span> all rights reserved.
                  Powered by <Link to='#'>The4</Link>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ul className='footer-bot-menu'>
                  <li className='menu-item'>
                    <Link to='#'>Shop</Link>
                  </li>
                  <li className='menu-item'>
                    <Link to='#'>About Us</Link>
                  </li>
                  <li className='menu-item'>
                    <Link to='#'>Contact</Link>
                  </li>
                  <li className='menu-item'>
                    <Link to='#'>Blog</Link>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
