import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Products from './components/products/pages/Products';
import ProductOrders from './components/products/components/ProductOrders';
import ProductDetails from './components/products/pages/ProductDetails';
import UserReviews from './components/products/pages/UserReviews';
import Cart from './components/products/pages/Cart';
import Checkout from './components/checkout/pages/Checkout';
import User from './components/users/pages/User';
import AllUsers from './components/users/pages/AllUsers';
import UserOrders from './components/users/components/UserOrders';
import AllUserProducts from './components/users/pages/AllUserProducts';
import CreateProduct from './components/products/pages/CreateProduct';
import Auth from './components/users/pages/Auth';
import OrderDetails from './components/checkout/pages/OrderDetails';

const Routes = () => {
  const { loggedInUser } = useSelector((state) => state.userAuth);
  const routes = loggedInUser?.token ? (
    <Switch>
      <Route exact path="/products" component={Products} />
      <Route path="/products/new" component={CreateProduct} />
      <Route path="/products/users/:uid" component={AllUserProducts} />
      <Route path="/products/:pid" component={ProductDetails} />
      <Route path="/users/:uid" component={User} />
      <Route path="/users" component={AllUsers} />
      <Route path="/cart/:pid?" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders/users/:uid" component={UserOrders} />
      <Route path="/orders/products/:pid" component={ProductOrders} />
      <Route path="/orders/:oid" component={OrderDetails} />
      <Route path="/reviews/users/:uid?" component={UserReviews} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/products" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/products" component={Products} />
      <Route path="/products/:pid" component={ProductDetails} />
      <Route path="/cart/:pid?" component={Cart} />
      <Route path="/reviews/users/:uid?" component={UserReviews} />
      <Route path="/auth" component={Auth} />
      <Route path="/auth/:redirect?" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );
  return routes;
};

export default Routes;
