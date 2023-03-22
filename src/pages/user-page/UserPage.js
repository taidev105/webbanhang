import React from 'react';
import hero from '../../assets/hero.jpg';
import './userPage.scss';
import Grid from '@material-ui/core/Grid';
import { useUserContext } from '../../context/user_context';
import { Link } from 'react-router-dom';
const UserPage = () => {
  const { wishList, logout, myUser } = useUserContext();
  return (
    <div className='content'>
      <div className='hero-section margin'>
        <div className='hero-img' style={{ backgroundImage: `url(${hero})` }}>
          <span>MY ACCOUNT</span>
        </div>
      </div>
      <div className='user-section'>
        <div className='user-container section-container'>
          <Grid container className='section-grid-content-wrapper'>
            <Grid item sx={12} ms={3} md={3} lg={3} className='relative'>
              <div className='user__list-wrapper'>
                <ul className='user__list'>
                  <li className='user__list__item nopointer'>Dashboard</li>
                  <li className='user__list__item'>
                    <Link to='/wishList'> wishlist ({wishList.length})</Link>
                  </li>
                  <li
                    className='user__list__item'
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item sx={12} ms={9} md={9} lg={9}>
              <div class='theiaStickySidebar'>
                <p>
                  Hello <strong>thanh trong</strong> (not{' '}
                  <strong>thanh trong</strong>?{' '}
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Log out
                  </button>
                  )
                </p>
                <p class='mt__40'>
                  <strong>Picture :</strong>
                </p>
                {myUser && (
                  <div className='user__img '>
                    <img src={myUser.picture} alt='empty'></img>
                  </div>
                )}
                <p class='mt__40'>
                  <strong>Account details :</strong>
                </p>
                <div class='table-responsive'>
                  <table>
                    <tbody>
                      <tr>
                        <td class='text-left'>
                          <strong>Name:</strong>
                        </td>
                        {myUser && <td>{myUser.nickname}</td>}
                      </tr>
                      <tr>
                        <td class='text-left'>
                          <strong>E-mail:</strong>
                        </td>
                        <td>thanh123@gmail.com</td>
                      </tr>
                      <tr>
                        <td class='text-left'>
                          <strong>Address:</strong>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
