import ItemList from './ItemList';
import star_icon from './images/down-arrow.svg';
import { useState } from 'react';

/*difference between -{ data }, { showItems } and {data,showItems} */

const MenuCatgories = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    // console.log('clicked');
    // setShowItems(!showItems);
    setShowIndex();
  };
  //   const [showItems, setShowItems] = useState(false);

  return (
    <div className="w-8/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold text-lg">
          {data.title}({data.itemCards.length})
        </span>
        <img src={star_icon} alt="star icon" />
      </div>

      {showItems && <ItemList items={data.itemCards} />}
    </div>
  );
};
export default MenuCatgories;
