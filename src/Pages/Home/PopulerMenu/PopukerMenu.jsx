import React, { useEffect, useState } from 'react';
import Section2 from '../../../Components/Section2/Section2';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopukerMenu = () => {

      const [menu]=useMenu();
      // console.log(menu);
// const populer=[]
      const populer= menu?.filter(item=>item.category =='popular')
    
      return (
            <section className='mb-12'>
                  <Section2></Section2>
                  <div className='grid md:grid-cols-2 gap-10'>
                        {
                              populer?.map(item => <MenuItem
                                    key={item._id}
                                    item={item}
                              >
                              </MenuItem>)
                        }
                  </div>
                  <button className="btn btn-outline border-0 border-b-4 mt-4 text-center">Veiw Full Menu</button>
            </section>
      );
};

export default PopukerMenu;