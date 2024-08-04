import React, { useContext, useState } from 'react';
import './Header.css';
import { useLinkClickHandler } from 'react-router-dom';
import restaurantLog from '../images/restaurant-log.png';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useSelector } from 'react-redux';
function Header() {
  const { loggedInUser } = useContext(UserContext);
  const [btnName, setBtnName] = useState('Login');
  const onlineStatus = useOnlineStatus();
  console.log(onlineStatus);
  //we are here subscribing  to the store
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div className="flex justify-between bg-slate-200 shadow-xl">
      <div>
        <img className=" h-24" src={restaurantLog} alt="restaurant logo" />
      </div>
      <div className="nav-items flex justify-start items-center p-2 mr-10 my-font">
        <div className="p-3">
          <Link to="/">Home</Link>
        </div>
        <div className="p-3">
          {' '}
          <Link to="/about">About Uss</Link>
        </div>
        <div className="p-3">
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="p-3 font-semibold">
          <Link to="/cart"> Cart- ({cartItems.length} items)</Link>
        </div>
        <div className=" font-semibold">{loggedInUser}</div>
      </div>
    </div>
  );
}

export default Header;
