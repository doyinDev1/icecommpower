// import classes from '../styles/ProductItem.css';
import classes from '../styles/Card2.module.css';
import ProductItemForm from './ProductItemForm';
import { useContext } from 'react';
import CartContext from '../store/cart-context';
const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = amount => {


    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    })
  }

  return (
    <>
      <li>
        <div className={classes.card}>
          <div className={classes.img}>
            <img src={props.image} className={classes.poster} alt="products" width={100} />
          </div>
          <h2 className={classes.title}>{props.name}</h2>
          <div className={classes.price}>
            <h4 className={classes.price}>{price}</h4>
            <h5 className={classes.rating}>Rating: {props.rating.rate}</h5>
          </div>
          <div>
            <ProductItemForm onAddToCart={addToCartHandler} />
          </div>

        </div>
      </li>
    </>
  );
};

export default ProductItem;