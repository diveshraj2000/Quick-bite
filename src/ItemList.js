import { useDispatch } from 'react-redux';
import { addItem } from './utils/cartSlice';

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="p-2 m-2  border-gray-200 border-b-2 text-left flex flex-wrap"
        >
          <div className="w-10/12">
            <div className=" flex justify-start">
              <span className="font-semibold ">
                {' '}
                {item?.card?.info?.name} -
              </span>

              <span className="font-semibold">
                ₹
                {item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs"> {item?.card?.info?.description}</p>
          </div>
          <div className="w-2/12">
            <img
              className="h-20 w-20 rounded-lg"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.info?.imageId}`}
            />
            <button
              /**  onClick={handleAddItem(item)} calling the function right away */
              className=" rounded-lg bg-white shadow-lg border-2 btn-border h-6 w-11 text-xs font-semibold  relative  left-4 bottom-3"
              style={{ color: 'rgb(27, 166, 114)' }}
              onClick={() => handleAddItem(item)}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
