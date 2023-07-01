import React, { useEffect, useState } from 'react';
import Section4 from '../../../Components/Section4/Section4';
import { Swiper, SwiperSlide } from "swiper/react";


import '@smastrom/react-rating/style.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Rating } from '@smastrom/react-rating';
const Testimonials = () => {
      const [reviews, setReviews] = useState([]);
      useEffect(() => {
            fetch('https://bistro-boss-server-pink.vercel.app/reviews')
                  .then(res => res.json())
                  .then(data => setReviews(data))

      }, [])
      // console.log(reviews)

      return (
            <section className='my-20'>
                  <Section4></Section4>
                  <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                        {
                              reviews?.map(data => <SwiperSlide
                                    key={data._id}
                              >
                                    <div className='m-24 flex flex-col items-center mx-24 my-16'>
                                          <Rating
                                                style={{ maxWidth: 180 }}
                                                value={data.rating}
                                                readOnly
                                          />
                                          <p className='py-8'>{data.details}</p>
                                          <h3 className='text-2xl text-orange-400'>{data.name}</h3>
                                    </div>
                              </SwiperSlide>)
                        }
                  </Swiper>

            </section>
      );
};

export default Testimonials;