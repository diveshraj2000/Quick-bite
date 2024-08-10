import React, { useEffect, useState } from 'react';
import './Body.css';
import Card, { withPromotedLabel } from '../Card/Card';
import Shimmer from '../Shimmer';
import { Link } from 'react-router-dom';
import '../App.css';
import useOnlineStatus from '../utils/useOnlineStatus';
import { PropagateLoader } from 'react-spinners';
import { Swiggy_api } from './utils/constant';
import { VERSEL_api } from './utils/constant';
import header_img from '../images/header_img.png';
function Body() {
  const [filterData, setFilterData] = useState([]);
  const [restaurantData, setRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');
  const isOnline = useOnlineStatus();
  const [isLoading, setIsLoading] = useState(true);
  const RestaurantCardPromoted = withPromotedLabel(Card);
  const [topRestaurantClicked, settopRestaurantClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(VERSEL_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: Swiggy_api,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    setIsLoading(false);

    console.log(json);
    if (
      json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        ?.length
    ) {
      console.log('first condition hit');
      setRestaurant(
        json.data.cards[1].card.card.gridElements?.infoWithStyle?.restaurants
      );
      setFilterData(
        json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    } else if (
      json.data.cards[4].card.card.gridElements?.infoWithStyle?.restaurants
        ?.length
    ) {
      setRestaurant(
        json.data.cards[4].card.card.gridElements?.infoWithStyle?.restaurants
      );
      setFilterData(
        json.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    } else {
      console.log('else condition hoit');
      setRestaurant(
        json.data.cards[0].card.card.gridElements?.infoWithStyle?.restaurants
      );
      setFilterData(
        json.data.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    }
  };
  function myFilter() {
    if (!topRestaurantClicked) {
      // If topRestaurantClicked is false, filter the restaurants with a rating greater than 4.5
      const filteredData = filterData.filter(
        (data) => data.info.avgRating > 4.5
      );
      setRestaurant(filteredData);
      settopRestaurantClicked(true); // Set topRestaurantClicked to true
    } else {
      // If topRestaurantClicked is true, reset the restaurant list to the original data
      setRestaurant(filterData);
      settopRestaurantClicked(false); // Set topRestaurantClicked to false
    }
  }

  if (isOnline === false) {
    return <h1>You are offline ,please check</h1>;
  }
  if (isLoading) {
    return (
      <div className="m-auto p-5 w-5/6">
        <Shimmer />
        <div className="loader-props">
          <PropagateLoader color="#36d7b7" />
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto p-5 w-5/6">
      <div className="req-header">
        <div className="header-content font-bold text-3xl max-[576px]:text-xl max-[576px]:font-normal  text-white  ">
          Find the best food here ...
        </div>
      </div>
      <div className="md:flex md:px-4 md:mt-6  max-[768px]:mt-4">
        <div className="Search max-[768px]:w-full">
          <input
            type="text"
            placeholder="  search for restaurant"
            className="rounded border border-black pl-3"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);

              const filteredRestaurant = filterData.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });

              if (e.target.value === '') {
                setRestaurant(filterData);
              } else {
                setRestaurant(filteredRestaurant);
              }
            }}
          />
          <button className="bg-slate-200 rounded-lg font-normal px-2 py-1 ml-2">
            Search
          </button>
        </div>
        <button
          className="bg-slate-200 rounded-lg md:ml-4 font-normal py-1 px-3 max-[768px]:mt-4  "
          onClick={myFilter}
        >
          Top Rated Restaurant
        </button>
      </div>

      {/* Check if there are no matching restaurants */}
      {restaurantData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-3xl font-semibold mb-4 text-center">
            No Restaurant Found
          </p>
        </div>
      ) : (
        <>
          <div className="p-3 my-4">
            <p className="text-2xl  font-semibold">
              Top Restaurant near by you
            </p>
          </div>
          <div className="flex flex-wrap">
            {restaurantData.map((restaurant) => (
              <div
                className="p-4 md:w-4/12 lg:w-3/12 xl:w-3/12 sm:w-6/12 min-[320px]:w-full"
                key={restaurant.info.id}
              >
                <Link to={'restaurant/' + restaurant.info.id}>
                  <Card restaurant={restaurant} />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Body;
