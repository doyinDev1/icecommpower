import Card from '../components/UI/Card';
import ProductItem from './ProductItem';
import classes from '../styles/AvailableProduct.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '../Config/Config'
import { toast } from 'react-hot-toast';
import SpinnerCustom from '../components/SpinnerCustom/SpinnerCustom';

const AvailableProduct = () => {

  // get product detail from api
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    axios
      .get(`${Config.url.API_URL}/products`)
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch((err) => {
        const errMsg = 'try again'
          ? err?.message
          : 'Failed to fetch';
        toast.error(errMsg);
        toast.error('try again');
        setLoading(false)

      });


  }, [])


  const productList = data?.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      image={product.image}
      name={product.title}
      description={product.description}
      price={product.price}
      rating={product.rating}
    />

  ));

  return (
    <section className={classes.product}>
      <Card>
        {loading &&
          <div className={classes.loading}>
            <SpinnerCustom />
          </div>

        }
        <ul>{productList}</ul>
      </Card>
      <div className={classes.card}>
      </div>
    </section>
  );
};

export default AvailableProduct;