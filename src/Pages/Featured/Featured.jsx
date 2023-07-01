import React from 'react';
import Section3 from '../../Components/Section3/Section3';
import featuredimg from '../../assets/home/featured.jpg'
import './featured.css'
const Featured = () => {
      return (
            <div className='featured-item bg-fixed text-white pt-10 my-20'>
                  <Section3></Section3>
                  <div className='md:flex justify-center items-center pt-12 py-20 px-36 bg-opacity-60' >
                        <div >
                              <img src={featuredimg} />
                        </div>
                        <div className='md:ml-10'>
                              <p>Aug 20,2029</p>
                              <p className='uppercase'> Where can i get some ?</p>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus numquam iste vel dolorum sint quidem odit, eveniet quaerat repellat esse distinctio expedita voluptas ab ipsa exercitationem neque dolorem sequi. Voluptates repellendus delectus quaerat tempora eos voluptatibus quos, dignissimos error tempore et illo dolore corrupti adipisci, consectetur quibusdam, accusamus voluptas harum.</p>
                              <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                        </div>
                  </div>
            </div>
      );
};

export default Featured;