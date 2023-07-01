import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
      const { name, image, price, recipe,_id } = item;
      const { user } = useContext(AuthContext);
      const[,refetch] =useCart();
     const navigate = useNavigate();
     const location = useLocation();
      const handeAddToCart = (item) => {
            console.log(item);

            if (user && user.email) {
                  const orderItem={
                        foodId:_id,name,image,price,email:user.email
                  }
                  fetch('https://bistro-boss-server-pink.vercel.app/carts',{
                        method:'POST',
                        headers:{
                              'content-type':'application/json'

                        },
                        body:JSON.stringify(orderItem)
                  })
                        .then(res => res.json())
                        .then(data => {
                              if (data.insertedId) {
                                refetch()
                                    Swal.fire({
                                          position: 'top-end',
                                          icon: 'success',
                                          title: 'Your cart added',
                                          showConfirmButton: false,
                                          timer: 1500
                                    })
                              }
                        })
            }else{

                  Swal.fire({
                        title: 'please login !',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok '
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate('/login',{state:{from:location}});
                        }
                      })
            }
      }
      return (
            <div className="card w-[90%] bg-base-100 shadow-xl">
                  <figure><img src={image} alt="Shoes" /></figure>
                  <p className='bg-slate-900 text-white absolute right-0 mt-4 mr-4 p-2'>${price}</p>
                  <div className="card-body flex flex-col items-center">
                        <h2 className="card-title">{name}</h2>
                        <p>{recipe}</p>
                        <div className="card-actions justify-end">
                              <button onClick={() => handeAddToCart(item)} className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400">Add to cart</button>
                        </div>
                  </div>
            </div>
      );
};

export default FoodCard;