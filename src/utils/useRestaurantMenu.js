import { useEffect, useState } from 'react';
import { MENU_API } from './constant';

const useRestaurantMenu = (resId) => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch(MENU_API + resId);
    const json = await res.json();
    setMenuData(json.data);
    /**
     * doubt agr simple json console log krte h print ho kaa rha but
     *   agr menu items m set kre then menu items se print kraaye to undedfined aa rha h
     */
  };
  return menuData;
};

export default useRestaurantMenu;
