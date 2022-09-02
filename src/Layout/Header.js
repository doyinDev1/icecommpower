import { Fragment, useState } from 'react';

import HeaderCartButton from './HeaderCartButton';
import storeImage from '../assets/images/store.jpeg';
import classes from '../styles/Header.module.css';
import Cart from '../Cart/Cart'
const Header = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
        <header className={classes.header}>
        <h1>ICE COMMERCE</h1>
        <HeaderCartButton
          onClick={showCartHandler}
        />
      </header>
      <div className={classes.main_image}>
      <img src={storeImage} alt='A table full of deliciousl food!' />
      </div>
    </Fragment>
  );
};

export default Header;