import React from 'react';
import { useSelector } from 'react-redux';
import ItemList from './ItemList';
import { useDispatch } from 'react-redux';
import { clearCart } from './utils/cartSlice';
function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);
  const handleClearCart = () => {
    console.log('clikc');
    dispatch(clearCart());
  };
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          onClick={handleClearCart}
          className="p-2 m-2 bg-black text-white rounded-lg"
        >
          {' '}
          Clear Cart
        </button>
        {cartItems.length === 0 && <h1>Car is empty</h1>}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
}

export default Cart;
