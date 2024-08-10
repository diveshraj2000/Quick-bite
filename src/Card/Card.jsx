import React from 'react';
import './Card.css';
import star_icon from '../images/image-2.svg';
import { star_t } from '../utils/constant';
import Chip from '@mui/material/Chip';
const Card = ({ restaurant }) => {
  const { info } = restaurant || {};
  const { cloudinaryImageId, name, avgRating, sla, cuisines = [] } = info || {};
  const { deliveryTime } = sla || {};
  //w-full  h-48
  //w-[100%] h-48
  return (
    <>
      <div className="bg-slate-100 h-full rounded-2xl shadow-xl p-3 transform transition-transform duration-300 hover:scale-105">
        {/* {restaurant.info?.totalRatingsString.includes('K') && (
          <Chip
            className="pos-rel"
            label={`${restaurant?.info?.totalRatingsString} rating`}
          />
        )} */}
        {cloudinaryImageId && (
          <img
            className=" md:w-full md:h-48 w-full  h-48  shadow-xl rounded-2xl sm:w-full sm:h-48"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
            alt={name || 'Food Image'}
          />
        )}
        <div className=" ">
          <span className=" font-semibold">{name}</span>
          <br />
          <div>
            <div className="flex">
              {' '}
              <img src={star_icon} alt="star icon" />
              <span className="ml-1">{avgRating}</span>&nbsp;&nbsp;
              <span>{deliveryTime} mins</span>
            </div>
          </div>
          <p className=" truncate card-text">{cuisines.join(', ')}</p>
        </div>
      </div>
    </>
  );
};

//Higher order component
// input - RestaurantCard=> Restaurant card promoted
// A component is just a function only
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    console.log(props);
    return <RestaurantCard {...props} />;
  };
};

export default Card;
