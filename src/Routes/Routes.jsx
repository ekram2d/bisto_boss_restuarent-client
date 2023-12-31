import React, { Children } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import Menu from '../Pages/Menu/Menu/Menu';
import Order from '../Pages/Order/Order/Order';
import Login from '../Pages/Login/Login';
import SingUp from '../Pages/SingUp';
import PrivateRoute from './PrivateRoute';
import Secret from '../Pages/Secret/Secret';
import DashBoard from '../Layout/DashBoard';
import Mycart from '../Pages/Dashboard/Mycart/Mycart';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import AddItem from '../Pages/Dashboard/AddItem/AddItem';
import AdminRoute from './AdminRoute';
import ManageItems from '../Pages/Dashboard/MangeItems/ManageItems';
import Payment from '../Pages/Dashboard/Payment/Payment';
import UserHome from '../Pages/Dashboard/UserHome/UserHome';
import AdminHome from '../Pages/Dashboard/AdminHome/AdminHome';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    children: [{
      path: '/',
      element: <Home></Home>

    }, {
      path: '/menu',
      element: <Menu></Menu>
    }, {
      path: '/order/:catagory',
      element: <Order></Order>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: 'register',
      element: <SingUp></SingUp>
    }, {
      path: '/secret',
      element: <PrivateRoute><Secret></Secret></PrivateRoute>
    }


    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      
      {
          path:'userhome',
          element:<UserHome></UserHome>
      },
      {

      path: 'mycart',
      element: <Mycart></Mycart>
    },
    
    {
   path:'payment',
   element:<Payment></Payment>
    },
    // admin routes
    {
      path:'adminhome',
      element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
    },
    {
      path: 'allusers',
      element: <AdminRoute><AllUsers></AllUsers></AdminRoute>


    },
    {
      path: 'additem',
      element: <AdminRoute><AddItem></AddItem></AdminRoute>
    },
    {
      path: 'manageitems',
      element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
    }


    ]
  }

]);