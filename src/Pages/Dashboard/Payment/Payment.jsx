import React from 'react';
import NewSectionTitle from '../../../Components/NewSectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFrom from './CheckoutFrom';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../../hooks/useCart';
// import CheckoutFrom from './CheckoutFrom';
// todo 
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK);
const Payment = () => {
      const [cart,refetch] = useCart();
      const total = cart?.reduce((sum, item) => item.price + sum, 0);
      const price=parseFloat(total.toFixed(2));
      // console.log(price);
      return (
            <div className='w-full'>
                  <NewSectionTitle subHeading="please process " heading="Payment"></NewSectionTitle>
                  <h2>Payment method</h2>
                  <Elements stripe={stripePromise}>
                  <CheckoutFrom price={price} cart={cart} refetch={refetch}></CheckoutFrom>
                  </Elements>
                  {/*  */}
            </div>
      );
};

export default Payment;