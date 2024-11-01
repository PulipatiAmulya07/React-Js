import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import Home from "./Home";
import NonVeg from "./NonVeg";
import Veg from "./Veg";
import './App.css';
import { useSelector } from "react-redux";
import ContactUs from "./ContactUs";
import Purchase from "./Purchase";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
    <GoogleOAuthProvider clientId="592801306186-b79208ocopfcbm1orallo12o9snthp3c.apps.googleusercontent.com">
      <GoogleLoginComponent/>
    </GoogleOAuthProvider>
    <BrowserRouter>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/veg">Veg</Link>
        <Link to="/nonveg">NonVeg</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/contactus">Contact Us</Link>
        <Link to="/purchase">Purchase</Link>
      </nav>
      
     
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/purchase" element={<Purchase />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
