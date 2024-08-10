import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from './utils/useRestaurantMenu';
import MenuCatgories from './MenuCategories';
import star_icon from './images/image-2.svg';
import { PropagateLoader } from 'react-spinners';
import './App.css';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const menuItems = useRestaurantMenu(resId);
  // const cartItems = useSelector((store) => store.cart.items);
  const [categories, setCategories] = useState([]);
  const [showIndex, setShowIndex] = useState(0);

  /**
   * We use useEffect in this case to handle side effects in your React component.
   * Specifically, useEffect allows you to perform actions such as data fetching, subscriptions,
   *  or manually changing the DOM when your component renders.
   */
  useEffect(() => {
    if (menuItems) {
      const filterCards = (cards) =>
        cards?.filter(
          (item) =>
            item?.card?.card?.['@type'] ===
            'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
        );

      let filteredCategories = filterCards(
        menuItems?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      );

      if (!filteredCategories || filteredCategories.length === 0) {
        filteredCategories = filterCards(
          menuItems?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        );
      }

      setCategories(filteredCategories);
    }
  }, [menuItems]);

  if (!menuItems) {
    return (
      <div className="loader-props">
        <PropagateLoader color="#36d7b7" />
      </div>
    ); // Add a loading state
  }

  return (
    <div className="menu w-5/6 m-auto p-3 ">
      <div className="rounded-xl req-bg md:w-9/12 sm:w-full mx-auto  md:p-6 sm:py-4 sm:px-2 max-[576px]:p-2">
        <span className="text-3xl text-left font-semibold menu-heading max-[576px]:text-xl">
          {menuItems?.cards?.[2]?.card?.card?.info?.name}
        </span>
        <div className="flex  font-semibold max-[576px]:font-medium max-[576px]:text-sm">
          <img src={star_icon} alt="star icon" />
          <span className="max-[576px]: text-sm">
            {menuItems?.cards?.[2]?.card?.card?.info?.avgRatingString}
            &nbsp;
          </span>
          <span>
            ({menuItems?.cards?.[2]?.card?.card?.info?.totalRatingsString})
          </span>
          <span>
            &nbsp; &nbsp;{' '}
            {menuItems?.cards?.[2]?.card?.card?.info?.costForTwoMessage}
          </span>
        </div>
        <div
          className="max-[576px]:text-sm"
          dangerouslySetInnerHTML={{
            __html: menuItems?.cards?.[2]?.card?.card?.info?.feeDetails.message,
          }}
        ></div>
        <span className="max-[576px]:text-sm">
          {menuItems?.cards?.[2]?.card?.card?.info?.cuisines?.join(', ')}
        </span>
        <h1 className="max-[576px]:text-sm">
          {menuItems?.cards?.[2]?.card?.card?.info?.areaName}
        </h1>
      </div>

      {categories && categories.length > 0 ? (
        categories.map((category, index) => (
          <MenuCatgories
            key={
              category?.card?.card?.id || category?.card?.card?.title || index
            }
            showItems={index === showIndex ? true : false}
            data={category?.card?.card}
            setShowIndex={() => setShowIndex(index)}
          />
        ))
      ) : (
        <div>No categories available.</div> // Add a fallback when categories are empty or undefined
      )}
    </div>
  );
};

export default RestaurantMenu;
