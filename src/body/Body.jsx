import React, { useEffect, useState } from 'react';
import './Body.css';
import Card, { withPromotedLabel } from '../Card/Card';
import Shimmer from '../Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
function Body() {
  const [filterData, setFilterData] = useState([]);
  const [restaurantData, setRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');
  const isOnline = useOnlineStatus();
  const RestaurantCardPromoted = withPromotedLabel(Card);

  useEffect(() => {
    getData();
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('https://handler-cors.vercel.app/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4089123&lng=77.3177894&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', //Replace
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    // console.log(json);
    setRestaurant(
      json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterData(
      json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  function myFilter() {
    let filterData = restaurantData.filter((data) => {
      return data.info.avgRating > 4;
    });
    setRestaurant(filterData);
  }

  async function getData() {
    try {
      const res = await fetch('https://handler-cors.vercel.app/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4089123&lng=77.3177894&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', //Replace
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const raw = await res.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if (isOnline === false) {
    return <h1>You are offline ,please check</h1>;
  }
  if (restaurantData.length === 0) {
    return (
      <div className="m-auto p-5 w-5/6">
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="m-auto p-5 w-5/6 ">
      <div className="flex px-4">
        <div className="Search">
          <input
            type="text"
            placeholder="  search for restaurant"
            className="rounded  border border-black pl-3"
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
              // setRestaurant(filteredRestaurant);
            }}
          />
          <button className="bg-slate-200 rounded-lg  font-normal px-2 py-1 ml-2">
            Search
          </button>
        </div>
        <button
          className="bg-slate-200 rounded-lg ml-4 font-normal py-1 px-3"
          onClick={() => {
            myFilter();
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="flex  flex-wrap">
        {restaurantData.map((restaurant) => (
          <div className="p-4  md:w-4/12 lg:w-3/12 xl:w-3/12  w-auto">
            <Link
              to={'restaurant/' + restaurant.info.id}
              key={restaurant.info.id}
            >
              {restaurant.info.avgRating > 4.5 ? (
                <RestaurantCardPromoted restaurant={restaurant} />
              ) : (
                <Card restaurant={restaurant} />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
{
  /* <div className="flex flex-wrap">
{restaurantData.map((restaurant) => (
  <div className="xl:w-3/12 lg:w-3/12 md:w-4/12 gap-8">
    <Link
      to={'restaurant/' + restaurant.info.id}
      key={restaurant.info.id}
    >
      {restaurant.info.avgRating > 4.5 ? (
        <RestaurantCardPromoted restaurant={restaurant} />
      ) : (
        <Card restaurant={restaurant} />
      )}
    </Link>
  </div>
))}
</div> */
}
