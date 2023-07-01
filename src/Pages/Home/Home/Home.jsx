import React from 'react';
import Banner from '../Banner/Banner';
import Catagory from '../Catagory/Catagory';
import PopukerMenu from '../PopulerMenu/PopukerMenu';
import Featured from '../../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
      return (
            <div>
                  <Helmet>
                        <title>Bisto Boss | Home</title>
                        
                  </Helmet>
                  <Banner></Banner>
                  <Catagory></Catagory>
                  <PopukerMenu></PopukerMenu>
                  <Featured></Featured>
                  <Testimonials></Testimonials>
            </div>
      );
};

export default Home;