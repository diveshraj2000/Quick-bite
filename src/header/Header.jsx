import React, { useContext, useState } from 'react';
import './Header.css';
import { useLinkClickHandler } from 'react-router-dom';
import restaurantLog from '../images/restaurant-log.png';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useSelector } from 'react-redux';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import hamburgershow from '../images/Hamburger.svg';
import hideHamburger from '../images/HamburgerClose.svg';
function Header() {
  const { loggedInUser } = useContext(UserContext);
  const [btnName, setBtnName] = useState('Logout');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onlineStatus = useOnlineStatus();
  // console.log(onlineStatus);
  //we are here subscribing  to the store
  const cartItems = useSelector((store) => store.cart.items);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const handleBtn = () => {
    if (btnName === 'Login') {
      setBtnName('Logout');
    } else {
      setBtnName('Login');
    }
  };
  // console.log(cartItems);
  return (
    // <div className="bg-slate-200 shadow-xl">
    //   <div className="flex justify-between items-center p-4">
    //     {/* Logo and Brand Name */}
    //     <div className="flex items-center">
    //       <img className="h-24" src={restaurantLog} alt="restaurant logo" />
    //       <span className="font-bold text-2xl">QuickBite</span>
    //     </div>

    //     {/* Hamburger Icon for Small Screens */}
    //     <div className="lg:hidden">
    //       <button
    //         onClick={toggleMenu}
    //         className="text-gray-700 focus:outline-none"
    //       >
    //         <svg
    //           className="w-6 h-6"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M4 6h16M4 12h16m-7 6h7"
    //           />
    //         </svg>
    //       </button>
    //     </div>

    //     {/* Navbar Links */}
    //     <div
    //       className={`lg:flex ${
    //         isOpen ? 'block' : 'hidden'
    //       } flex-col lg:flex-row lg:items-center lg:space-x-6`}
    //     >
    //       <div className="nav-items flex flex-col lg:flex-row justify-start items-start lg:items-center lg:p-2 mr-10 my-font">
    //         <div className="p-3">Online status:🟢</div>
    //         <div className="p-3">
    //           <Link to="/">Home</Link>
    //         </div>

    //         <div className="p-3">
    //           <Link to="/contact">Contact Us</Link>
    //         </div>
    //         <div className="p-3">
    //           {totalQty > 0 ? (
    //             <div className="font-semibold">
    //               <Link to="/cart">Cart ({totalQty} items)</Link>
    //             </div>
    //           ) : (
    //             <Link to="/cart">Cart</Link>
    //           )}
    //         </div>
    //         <div
    //           className="p-3 font-semibold cursor-pointer"
    //           onClick={handleBtn}
    //         >
    //           {btnName}
    //         </div>
    //         <div className="p-3 font-semibold">{loggedInUser}</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-slate-200 shadow-xl">
      <div className="flex md:justify-between items-center p-4 ">
        {/* Logo and Brand Name */}
        <div className="md:hidden max-[768px]:w-[10%]">
          <button onClick={toggleMenu} className="navbar-toggler">
            <img
              className={`icon ${isOpen ? 'close' : 'open'}`}
              src={isOpen ? hideHamburger : hamburgershow}
              alt={isOpen ? 'close' : 'open'}
            />
          </button>
        </div>
        <div className="flex items-center max-[768px]:w-[40%]">
          <img className="h-24" src={restaurantLog} alt="restaurant logo" />
          <span className="font-bold text-3xl">QuickBite</span>
        </div>
        <div
          className={`md:flex ${
            isOpen
              ? 'max-[768px]:flex max-[768px]:w-[50%] max-[768px]:items-end max-[768px]:justify-end'
              : 'hidden'
          } flex-col md:flex-row md:items-center md:space-x-6`}
        >
          <div className="nav-items flex flex-col md:flex-row   md:justify-start  md:items-center md:p-2 mr-10 my-font max-[767px]:justify-end">
            <div className="p-3">Online status:🟢</div>
            <div className="p-3">
              <Link to="/">Home</Link>
            </div>

            <div className="p-3">
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="p-3">
              {totalQty > 0 ? (
                <div className="font-semibold">
                  <Link to="/cart">Cart ({totalQty} items)</Link>
                </div>
              ) : (
                <Link to="/cart">Cart</Link>
              )}
            </div>
            <div
              className="p-3 font-semibold cursor-pointer"
              onClick={handleBtn}
            >
              {btnName}
            </div>
            <div className="p-3 font-semibold">{loggedInUser}</div>
          </div>
        </div>
      </div>
    </div>
  );

  //   <div className="flex justify-between bg-slate-200 shadow-xl">

  //     <div className="flex items-center">
  //       <img className=" h-24" src={restaurantLog} alt="restaurant logo" />
  //       <span className="font-bold text-2xl6">QuickBite</span>
  //     </div>
  //     <div className="nav-items flex justify-start items-center p-2 mr-10 my-font">
  //       <div className="p-3">Online status:🟢</div>
  //       <div className="p-3">
  //         <Link to="/">Home</Link>
  //       </div>

  //       <div className="p-3">
  //         <Link to="/contact">Contact Us</Link>
  //       </div>
  //       <div className="">
  //         {totalQty > 0 ? (
  //           <div className="p-3 font-semibold">
  //             <Link to="/cart">Cart ({totalQty} items)</Link>
  //           </div>
  //         ) : (
  //           <div className="p-3">
  //             <Link to="/cart">Cart</Link>
  //           </div>
  //         )}
  //       </div>
  //       <div className="p-3 font-semibold" onClick={handleBtn}>
  //         {btnName}
  //       </div>
  //       <div className="  font-semibold">{loggedInUser}</div>
  //     </div>
  //   </div>
  // );
}

export default Header;
