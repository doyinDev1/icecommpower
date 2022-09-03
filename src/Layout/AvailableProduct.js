import Card from '../components/UI/Card';
import ProductItem from './ProductItem';
import classes from '../styles/AvailableProduct.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '../Config/Config'
import { toast } from 'react-hot-toast';
import SpinnerCustom from '../components/SpinnerCustom/SpinnerCustom';
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter';
const AvailableProduct = () => {

  const [data, setData] = useState()
  const [categories, setCategories] = useState()
  const [loading, setLoading] = useState(true)
  const [selectCategories, setSelectCategories] = useState(null)

  // fetch all products to be displayed in user dashboard
  const getProducts = () => {
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
        setLoading(false)

      });
  }

  // get categories tof products, it should be fetched once
  const getCategories = () => {
    axios
      .get(`${Config.url.API_URL}/products/categories`)
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        const errMsg = 'try again'
          ? err?.message
          : 'Failed to fetch';
        toast.error(errMsg);
      });
  }
  // re-renders when you select a category and returns category items
  const fetchCategories = () => {
    setLoading(true)
    axios
      .get(`${Config.url.API_URL}/products/category/${selectCategories.toLowerCase()}`)
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch((err) => {
        const errMsg = 'try again'
          ? err?.message
          : 'Failed to fetch';
        toast.error(errMsg);
      });
  }

  useEffect(() => {
    //to avoid re-rendering check if data has been loaded 
    if (!data) {
      getProducts()
    }
    getCategories()

    if (selectCategories != null) {
      fetchCategories()
    }

  }, [!data, selectCategories])
  
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
  // reset dropdown and renders all products from api
  const doReset = () => {
    setLoading(true)
    getProducts()
    setSelectCategories(null)

  }

  return (
    <section className={classes.product}>
      <div className={classes.filterMain}>
        <div className={classes.productText}>
          <h3>All {selectCategories} products</h3>
        </div>
        <div className={classes.category}>
          {/* get selected category from dropdown */}
          <h4 className={classes.filter}>Filter by Categories</h4>
          <select defaultValue="View By Categories" onChange={(e) => { setSelectCategories(e.target.value) }}>
            <option disabled>View By Categories</option>
            {categories?.map((category, index) => (
              <>
                <option key={index}>{capitalizeFirstLetter(category)}</option>
              </>
            ))}
          </select>
          {selectCategories !== null &&
            <div className={classes.filterButton}>
              <button className={classes.button} onClick={doReset}>Reset</button>
            </div>
          }
        </div>
      </div>

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