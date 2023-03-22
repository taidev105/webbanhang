import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ButtonProvider } from './context/button_context';
import { ProductProvider } from './context/product_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './context/user_context';
ReactDOM.render(
  <Auth0Provider
    domain='dev-i9uazsit.us.auth0.com'
    clientId='UMaJBQuOZ3njLqHL1C0AG9mye51lcEI4'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductProvider>
        <FilterProvider>
          <ButtonProvider>
            <CartProvider>
              <Router>
                <App />
              </Router>
            </CartProvider>
          </ButtonProvider>
        </FilterProvider>
      </ProductProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
