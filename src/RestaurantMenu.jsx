import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from './utils/useRestaurantMenu';
import MenuCatgories from './MenuCategories';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const menuItems = useRestaurantMenu(resId);
  const [categories, setCategories] = useState([]);
  const [showIndex, setShowIndex] = useState(0);

  /**
   * We use useEffect in this case to handle side effects in your React component.
   * Specifically, useEffect allows you to perform actions such as data fetching, subscriptions,
   *  or manually changing the DOM when your component renders.
   */
  useEffect(() => {
    if (menuItems) {
      const filteredCategories =
        menuItems?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (item) =>
            item?.card?.card?.['@type'] ===
            'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
        );
      setCategories(filteredCategories);
    }
  }, [menuItems]);

  if (!menuItems) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div className="menu w-5/6 m-auto p-3 items-center text-center">
      <div className="rounded-lg bg-slate-100">
        <h1>{menuItems?.cards?.[2]?.card?.card?.info?.name}</h1>
        <h1>{menuItems?.cards?.[2]?.card?.card?.info?.totalRatingsString}</h1>
        <h1>{menuItems?.cards?.[2]?.card?.card?.info?.areaName}</h1>
        <h1>{menuItems?.cards?.[2]?.card?.card?.info?.avgRatingString}</h1>
        <h1>{menuItems?.cards?.[2]?.card?.card?.info?.costForTwoMessage}</h1>
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
