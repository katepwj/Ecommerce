import styled from "styled-components";
// import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useState, useEffect } from "react";
import { fetchCategories } from '../api/index'
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}

`;

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)


  const getCategoriesFunc = async () => {
    setLoading(true)
    try {
      const res = await fetchCategories()
      setCategories(res.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }


  useEffect(() => {
    getCategoriesFunc()
    return () => {
      setCategories([])
    }
  }, [])
  return (
    <Container>
      {loading ?
        <h3>loading...</h3> :
        categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
    </Container>
  );
};

export default Categories;
