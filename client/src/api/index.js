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
// export const fetchCategories=()=>API.get("/categories")
















// export const fetchPosts=()=>API.get("/posts")
// export const createPost=(newPosts)=>API.post("/posts",newPosts)
// export const likePost=(id)=>API.patch("/")
// export const signIn=(formData)=>API.post("/user/signin",formData)
// export const signUp=(formData)=API.post("user/signup",formData)



