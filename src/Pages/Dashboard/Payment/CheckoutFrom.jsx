import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { setPersistence } from 'firebase/auth';
import './CheckhoutForm.css'
import Swal from 'sweetalert2';
const CheckoutFrom = ({ price,cart,refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(" ");
  const {user} = useAuth();
  console.log('price',price);

  const [axiosSecure] = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('');
  const [processing,setProcessing] =useState(false)
  const [transactioId,setTransactionId] =useState(' ');
  useEffect(() => {
    if(price > 0){
      axiosSecure.post('/create-payment-intent', { price })
      .then(res => {

        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
    }

  }, [price,axiosSecure])
  console.log(transactioId)

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return
    }
    console.log(card)
    const { error} = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      setCardError(error.message)
      console.log('error', error);
    } else {
      setCardError(" ");
      // console.log('payment', paymentMethod);
    }
 (true);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
          payment_method: {
              card: card,
              billing_details: {
                  email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous'
              },
          },
      },
  );
      
      
      
      
      
      
      if(confirmError){
        console.log(confirmError);
        
      }
      
      console.log(" paymentIntent",paymentIntent)
      setProcessing(false)
      if(paymentIntent?.status =='succeeded') {
        setTransactionId(paymentIntent.id);
        const transactioId = paymentIntent.id;
        //To do
        // save payment information to the server 
        const payment={email:user?.email,transactioId:paymentIntent.id,
        price,
        date: new Date(),
        quantity:cart?.length,
        status:'servcie pending',
        cartitems:cart?.map(item=>item._id),
        manuItems:cart?.map(item=>item.foodId),
        itemNames:cart?.map(item=>item.name)
        }

        axiosSecure.post('/payments',payment)
        .then(res=>{
          console.log(res.data);
          if(res.data.insertresult.insertedId){
            //displai confiremd
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your payment  has been successfully done',
              showConfirmButton: false,
              timer: 1500
            })
          

          }
        })
      }
      

  }
  return (
    <>
      <form className='w-full m-4' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-outline btn-primary btn-sm mt-3 ' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      {cardError && <p className='text-center text-red-600'>{cardError}</p>}
      {transactioId && <p className='text-green-600 text-center'>Transaction Complete wiht transactionId:{transactioId}</p>}
    </>
  );
};

export default CheckoutFrom;