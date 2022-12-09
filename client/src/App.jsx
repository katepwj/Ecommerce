import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
 
  
const App = () => {
  const user = true
  return (<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/products/:category?" component={ProductList} />
    <Route path="/cart" component={Cart} />
    <Route path="/product/:id" component={Product} />
    <Route path="/login" render={props => {
      return (
        user ? <Redirect to="/" /> : <Login />
      )
    }} />


  </Switch>
  )
};

export default App;


{/* <Route path="/login" component={Login} /> */ }
{/* <Route path="/register" component={Register} /> */ }
{/* <Route path="*" component={NotFound} /> */ }