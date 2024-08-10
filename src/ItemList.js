import { useDispatch } from 'react-redux';
import {
  addItem,
  incrementQty,
  removeItem,
  decrementQty,
} from './utils/cartSlice';
import { CiCircleMinus } from 'react-icons/ci';
import { CiCirclePlus } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
const ItemList = ({ items, isCart }) => {
  console.log('show cart-->', isCart);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    let finalObj = { ...item, qty: 1 };
    console.log(finalObj);
    dispatch(addItem(finalObj));
    handleToast(item?.card?.info?.name, 'Add');
  };
  const handleRemoveItem = (item) => {
    handleToast(item?.card?.info?.name, 'Remove');
    console.log(item);

    dispatch(removeItem(item));
  };
  const handlIncrementQty = (item) => {
    handleToast(item?.card?.info?.name, 'Add');
    dispatch(incrementQty(item));
  };
  const handleDecrementQty = (item) => {
    if (item.qty > 1) {
      dispatch(decrementQty(item));
    } else {
      dispatch(removeItem(item));
    }
  };
  const handleToast = (item, operation) => {
    if (operation == 'Add') {
      toast.success(`${item} added to cart`);
    } else {
      toast.success(`${item} removed from cart`);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        {items.map((item) => (
          <div
            key={item?.card?.info?.id}
            className="p-2 m-2  border-gray-200 border-b-2 text-left flex flex-wrap max-[576px]:text-sm max-[576px]:w-full"
          >
            <div className="sm:w-10/12 max-[576px]:w-full">
              <div className=" flex justify-start">
                <span className="font-semibold ">
                  {' '}
                  {item?.card?.info?.name}
                </span>

                <span className="font-semibold ">
                  &nbsp; ₹
                  {item?.card?.info?.price
                    ? item?.card?.info?.price / 100
                    : item?.card?.info?.defaultPrice / 100}
                </span>
              </div>
              <p className="text-xs"> {item?.card?.info?.description}</p>
            </div>
            <div className="sm:w-2/12 max-[576px]:w-full max-[576px]:mt-4">
              <div className="flex">
                <img
                  className="h-20 w-20 rounded-lg"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.info?.imageId}`}
                />
                {isCart && (
                  <MdDeleteOutline
                    className="hover:text-white   hover:bg-gray-400  rounded-md transition-all ease-linear"
                    onClick={() => handleRemoveItem(item)}
                  />
                )}
              </div>

              {!isCart && (
                <button
                  /**  onClick={handleAddItem(item)} calling the function right away */
                  className=" rounded-lg bg-white shadow-lg border-2 btn-border h-6 w-11 text-xs font-semibold  relative  left-4 bottom-3"
                  style={{ color: 'rgb(27, 166, 114)' }}
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              )}
              {isCart && (
                <div className="flex sm:justify-center sm:mr-2 max-[576px]:justify-start">
                  <button onClick={() => handlIncrementQty(item)}>
                    <CiCirclePlus className="hover:text-white   hover:bg-gray-400  rounded-lg transition-all ease-linear" />
                  </button>
                  <p> &nbsp;{item.qty}&nbsp;</p>
                  <button onClick={() => handleDecrementQty(item)}>
                    <CiCircleMinus className="hover:text-white   hover:bg-gray-400  rounded-lg transition-all ease-linear" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ItemList;
