import ItemList from './ItemList';
import star_icon from './images/down-arrow.svg';
import { useState } from 'react';

/*difference between -{ data }, { showItems } and {data,showItems} */

const MenuCatgories = ({ data, setShowIndex }) => {
  const handleClick = () => {
    // console.log('clicked');
    setShowItems(!showItems);
    // setShowIndex();
  };
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="md:w-8/12 sm:w-full mx-auto my-4 bg-gray-50 shadow-lg p-4 max-[576px]:w-full">
      <div
        className="flex justify-between cursor-pointer transition-all duration-500 ease-linear"
        onClick={handleClick}
      >
        <span className="font-bold text-lg max-[576px]:text-base">
          {data.title}({data.itemCards.length})
        </span>
        <img src={star_icon} alt="star icon" />
      </div>

      <div
        className={`transition-all duration-500 ease-linear overflow-hidden ${
          showItems ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {showItems && <ItemList items={data.itemCards} isCart={false} />}
      </div>
    </div>
  );
};
export default MenuCatgories;
