import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreament, increament, removeCart } from './Store';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Function to calculate totals (original, discounted, and savings)
  const calculateTotals = () => {
    const originalTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const effectiveDiscount = discount > couponDiscountPercentage ? discount : couponDiscountPercentage;
    const discountedTotal = originalTotal - (originalTotal * effectiveDiscount) / 100;
    const savings = originalTotal - discountedTotal;
    return {
      originalTotal: originalTotal.toFixed(2),
      discountedTotal: discountedTotal.toFixed(2),
      savings: savings.toFixed(2),
    };
  };

  // Destructure the totals
  const { originalTotal, discountedTotal, savings } = calculateTotals();

  // Apply specific percentage discount
  const applyDiscount = (percent) => {
    setDiscount(percent);
  };

  // Apply discount if coupon is valid
  const handleApplyCoupon = () => {
    switch (couponCode) {
      case 'Amulya10':
        setCouponDiscountPercentage(10);
        break;
      case 'Amulya20':
        setCouponDiscountPercentage(20);
        break;
      default:
        alert("Invalid coupon code");
        setCouponDiscountPercentage(0);
    }
  };

  const items = cartItems.length > 0 ? (
    <ul>
      {cartItems.map((item, index) => (
        <li key={index}>
          {item.name} - ${item.price.toFixed(2)} - Quantity: {item.quantity}
          <button style={{ marginRight: '10px' }} onClick={() => dispatch(increament({ name: item.name }))}>+</button>
          <button style={{ marginRight: '10px' }} onClick={() => dispatch(decreament({ name: item.name }))}>-</button>
          <button onClick={() => dispatch(removeCart({ name: item.name }))}>Remove</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no items in the cart.</p>
  );

  return (
    <>
      <h3>Cart Items</h3>
      {items}

      <h4>Total bill before discount: ${originalTotal}</h4>
      
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(10)}>Apply Discount 10%</button>
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(20)}>Apply Discount 20%</button>
      <button onClick={() => applyDiscount(30)}>Apply Discount 30%</button>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button style={{ marginRight: '10px' }} onClick={handleApplyCoupon}>Apply Coupon</button>
        <p>Coupon Discount Applied: {couponDiscountPercentage}%</p>
      </div>

      <p>Discount percentage applied: {discount > couponDiscountPercentage ? discount : couponDiscountPercentage}%</p>
      <p>Discount amount: ${savings}</p>
      <h4>Final bill after discount: ${discountedTotal}</h4>
    </>
  );
}

export default Cart;
