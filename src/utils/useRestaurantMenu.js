import { useEffect, useState } from 'react';
import { MENU_API } from './constant';

const useRestaurantMenu = (resId) => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('https://handler-cors.vercel.app/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: MENU_API + resId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

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
