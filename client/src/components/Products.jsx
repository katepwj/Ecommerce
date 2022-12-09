// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import { fetchProducts, fetchOneCategory } from '../api/index'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  
`;

const Products = (props) => {
  const { category, filters, sort } = props


  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)



  // FETCH PRODUCTS BASED ON CATEGORY
  const getProductsFunc = async (category) => {
    setLoading(true)
    try {
      const res = await (category
        ? fetchOneCategory(category)
        : fetchProducts())
      setProducts(res.data);
    } catch (err) {
      console.log(err)
    }
    setLoading(false)

  };
  useEffect(() => {
    getProductsFunc(category);
  }, [category]);



  useEffect(() => {
    filters &&
      setFilteredProducts(
        products.filter(product =>
          Object.entries(filters).every(([key, value]) => {
            let res = product[key].filter(item => item.includes(value))
            if (res.length > 0) {
              return [key, value]
            }
          }
          )
        )
      );
  }, [products, filters, category]);




  useEffect(() => {
    console.log("sort", sort)
    // newest
    if (sort === "newest") {
      filteredProducts.forEach(item => console.log(item.createdAt))
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )

    } else if (sort === "asc") {
      setFilteredProducts(prev => (
        [...prev].sort((a, b) => a.price - b.price)
      ))
    } else {
      setFilteredProducts(prev => (
        [...prev].sort((a, b) => b.price - a.price)
      ))
    }

  }, [sort])

  const homePageLayout = products.slice(0, 8).map((item) => (
    <Product item={item} key={item.id} />
  ))

  const productPageLayout = filteredProducts.map((item) => (
    <Product item={item} key={item.id} />
  ))

  return (
    <Container>
      {loading
        ?
        <h3>Loading...</h3>
        :
        (
          filters ?
            productPageLayout
            :
            homePageLayout
        )
      }
    </Container>
  );
};

export default Products;

