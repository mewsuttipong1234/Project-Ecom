import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from '../pages/admin/Dashboard';
import Product from "../pages/admin/Product";
import Category from "../pages/admin/Category";
import LayoutUser from "../layouts/LayoutUser";
import Manage from "../pages/admin/Manage";
import HomeUser from "../pages/User/HomeUser";
import ProtechRouteUser from "./ProtechRouteUser";
import ProtechRoteAdmin from "./ProtechRoteAdmin";
import EditProduct from "../pages/admin/EditProduct";

const router = createBrowserRouter([
  { path:'/',
    element:<Layout/>,
    children:[
      { index:true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },
  {
    path:'/admin',
    element:<ProtechRoteAdmin element={<LayoutAdmin/>}/>,
    // element:<LayoutAdmin/>,
    children:[
      { index:true , element:<Dashboard/> },
      { path:"product" , element:<Product/>},
      { path:"category" , element:<Category/>},
      { path:"product/:id" , element:<EditProduct/>},
      { path:"manage" , element:<Manage/>},
    ]

  },
  {
    path:'/user',
    element:<ProtechRouteUser element={<LayoutUser/>}/>,
    // element:<LayoutUser/>,
    children: [
      { index:true , element:<HomeUser/>}
    ]
  }

]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default AppRoutes;
