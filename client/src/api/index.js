import axios from 'axios'


const API=axios.create({baseURL:"http://localhost:5000/api"})

API.interceptors.request.use(config=>{
  const user=localStorage.getItem("user")
if(user){
  config.headers.Authorization=`Bear ${JSON.parse(user)}`
}
return config
})


export const fetchProducts=()=>API.get("/products")
export const fetchProduct=(id)=>API.get(`/products/find/${id}`)

export const fetchOneCategory=(category)=>API.get(`/products?category=${category}`)

export const fetchCategories=()=>API.get("/categories/all")




