import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaHSquare, FaCalendar, FaUtensils, FaBook, FaUsers } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';
const DashBoard = () => {
      const [cart, refetch] = useCart();
      // TODO : load data from the server to have dynamic is admin based on Data
      // const isAdmin = true;
      const [isAdmin] = useAdmin();
      // console.log(isAdmin)
      console.log('da', isAdmin);
      return (
            <div className="drawer drawer-mobile">
                  <Helmet>
                        <title>Bisto Boss | Dashboard</title>

                  </Helmet>
                  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content ">
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                        <Outlet></Outlet>


                  </div>
                  <div className="drawer-side bg-[#D1A054]">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-72 bg-base-100 text-base-content">

                              {isAdmin ? <>
                                    <li><NavLink to='/dashboard/adminhome'><FaHSquare></FaHSquare>Adimin Home</NavLink></li>
                                    <li><NavLink to='/dashboard/additem'><FaUtensils></FaUtensils>Add Items</NavLink></li>
                                    <li><NavLink to='/dashboard/manageitems'><FaWallet></FaWallet>Manage Items</NavLink></li>
                                    <li><NavLink to='/dashboard/history'><FaBook></FaBook>Manage Bookings</NavLink></li>
                                    <li><NavLink to='/dashboard/allusers'><FaUsers></FaUsers>All users</NavLink></li>



                              </> : <><li><NavLink to='/dashboard/userhome'><FaHSquare></FaHSquare>User Home</NavLink></li>
                                    <li><NavLink to='/dashboard/reservations'><FaCalendar></FaCalendar>Reservations</NavLink></li>
                                    <li><NavLink to='/dashboard/history'><FaWallet></FaWallet>Payment History</NavLink></li>
                                    <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>My Cart+{cart?.length || 0}</NavLink></li></>}
                              <div className="divider"></div>
                              <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                              <li><NavLink to='/menu'> Our Menu</NavLink></li>
                              <li><NavLink to='/order/salad'>Order Food</NavLink></li>
                              <li></li>
                        </ul>

                  </div>
            </div>
      );
};

export default DashBoard;