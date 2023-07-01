import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import banner3 from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soapImg from '../../../assets/menu/soup-bg.jpg'
import PopukerMenu from '../../Home/PopulerMenu/PopukerMenu';
import useMenu from '../../../hooks/useMenu';
import NewSectionTitle from '../../../Components/NewSectionTitle';
import MenuCatagory from '../MenuCatagory/MenuCatagory';
const Menu = () => {
      const [menu] = useMenu();
      const deserts = menu?.filter(item => item.category == 'dessert')
      const soap = menu?.filter(item => item.category == 'soup')
      const salad = menu?.filter(item => item.category == 'salad')
      const pizza = menu?.filter(item => item.category == 'pizza')
      const offered = menu?.filter(item => item.category == 'offered')
      //console.log(deserts,s)
      return (
            <div>
                  <Helmet>
                        <title>Bisto Boss | Menu</title>


                  </Helmet>
                  <Cover img={banner3} title="our menu"></Cover>


                  <NewSectionTitle subHeading="Dont Miss" heading="Today's Offer"></NewSectionTitle>
                  {/* offered */}
                  <MenuCatagory items={offered}></MenuCatagory>
                  {/* desert menu */}
                  <MenuCatagory items={deserts} title="Desserts" CoverImg={dessertImg}></MenuCatagory>
                  <MenuCatagory items={pizza} title={"pizza"} CoverImg={pizzaImg} ></MenuCatagory>
                  <MenuCatagory items={salad} title={"salad"} CoverImg={saladImg} ></MenuCatagory>
                  <MenuCatagory items={soap} title={"soup"} CoverImg={soapImg} ></MenuCatagory>

            </div>
      );
};

export default Menu;