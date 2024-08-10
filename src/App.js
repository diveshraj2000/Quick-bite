import './App.css';
import Header from './header/Header';
import Body from './body/Body';
import UserContext from './UserContext';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Contact from './Contact';
import Error from './Error';
import RestaurantMenu from './RestaurantMenu';
import { Suspense, useEffect, useState } from 'react';
import { lazy } from 'react';
import { Provider } from 'react-redux';
import Cart from './Cart';
import appStore from './utils/appStore';
import Success from './Success';
/**We have done dynamicall import of about component , it is load only when we
 * route to this compontnt that is callaed the lazy loading */
const About = lazy(() => import('./About'));
function App() {
  const [username, setusername] = useState({});
  useEffect(() => {
    const data = {
      name: 'Rahul',
    };
    setusername(data.name);
    // console.log(username);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: 'Divesh Rajput' }}>
        <div className="App">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
}
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<h1> Loading... </h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/restaurant/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],

    errorElement: <Error />,
  },
]);

export default App;
