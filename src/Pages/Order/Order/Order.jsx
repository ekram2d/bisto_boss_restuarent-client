import React, { useState } from 'react';
import OrderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import FoodCard from '../../../Components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Order = () => {
      const catagories = ['salad','pizza','soup','desserts','drinks']
      const{catagory} = useParams();
      const initialIndex = catagories.indexOf(catagory.toLowerCase())
console.log(initialIndex)
      const [tabIndex, setIndex] = useState(0)
      const [menu] = useMenu();
    
      console.log(catagory);
      const deserts = menu?.filter(item => item.category == 'dessert')
      const soup = menu?.filter(item => item.category == 'soup')
      const salad = menu?.filter(item => item.category == 'salad')
      const pizza = menu?.filter(item => item.category == 'pizza')
      const drikns = menu?.filter(item => item.category == 'drinks')
      // console.log(soup,pizza,deserts)
      return (
            <div>

                  <Helmet>
                        <title>Bistro Boss | Order Food</title>
                  </Helmet>
                  <Cover img={OrderCover} title="Order Food"></Cover>
                  <Tabs defaultIndex={initialIndex} onSelect={(index) => setIndex(index)}>
                        <TabList>
                              <Tab>Salad</Tab>
                              <Tab>Pizza</Tab>
                              <Tab>Soap</Tab>
                              <Tab>Dessert</Tab>
                              <Tab>Drinks</Tab>

                        </TabList>
                        <TabPanel>

                              <OrderTab items={salad}></OrderTab>
                        </TabPanel>
                        <TabPanel>

                              <OrderTab items={pizza}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                              <OrderTab items={soup}></OrderTab>
                        </TabPanel>
                        <TabPanel>

                              <OrderTab items={deserts}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                              <OrderTab items={drikns}></OrderTab>
                        </TabPanel>
                  </Tabs>
            </div>
      );
};

export default Order;