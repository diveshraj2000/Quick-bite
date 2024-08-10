import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ItemList from './ItemList';
import { useDispatch } from 'react-redux';
import { clearCart } from './utils/cartSlice';
import { useNavigate } from 'react-router-dom';
import empty_carts from '../src/images/empty-cart.png';
import './App.css';
import ConfirmationModal from './ConfirmationModal';
import { PropagateLoader } from 'react-spinners';
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  console.log(totalQty);
  const totalAmount = cartItems.reduce(
    (totalAmt, item) =>
      totalAmt +
      ((item?.card?.info?.price || item?.card?.info?.defaultPrice) / 100) *
        item.qty,
    0
  );

  const handleClearCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setIsModalOpen(false);
    dispatch(clearCart());
  };
  return (
    <>
      {isLoading ? (
        <div className="loader-props">
          <PropagateLoader color="#36d7b7" />
        </div>
      ) : (
        <>
          {' '}
          <div className="text-center m-4 p-4">
            <div className="w-6/12 m-auto max-[576px]:w-full">
              {cartItems.length === 0 ? (
                <div className="h-[75vh] flex items-center justify-center flex-col">
                  <img
                    className=" w-[20%] mx-auto"
                    src={empty_carts}
                    alt="empty cart"
                  />
                  <h1 className="text-3xl mt-4">Car is empty</h1>{' '}
                </div>
              ) : (
                <>
                  {' '}
                  <h1 className="text-2xl font-bold">Cart</h1>
                  <ItemList items={cartItems} isCart={true} />
                  <div className="text-left mt-12">
                    <h1 className="text-2xl font-bold">Total</h1>
                    <p className="font-medium">Items: {totalQty}</p>

                    <span className="font-medium">
                      {' '}
                      Amount: ₹{totalAmount.toFixed(2)}
                    </span>
                    <br />
                    <div className="flex justify-between mt-6">
                      <button
                        className="px-4 py-2 text-white rounded-lg btn-props "
                        onClick={() => navigate('/success')}
                      >
                        Checkout
                      </button>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 text-white rounded-lg  req-font req-border"
                      >
                        {' '}
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleClearCart}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
