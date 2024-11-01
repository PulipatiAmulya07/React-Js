import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";

function Veg() {
  const dispatch = useDispatch();
  const vegproducts = useSelector((state) => state.products.veg); 

  const items = vegproducts.map((product,index) => (
    <li key={index}>
      {product.name} - ${product.price.toFixed(2)}
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </li>
  ));

  return (
    <>
      <h2>Veg Products</h2>
      <ul>{items}</ul>
    </>
  );
}

export default Veg;
