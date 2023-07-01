import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import { AiFillAmazonCircle,AiFillDelete } from "react-icons/ai";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Mycart = () => {
      const [cart,refetch] = useCart();
      console.log(cart)


      const total = cart?.reduce((sum, item) => item.price + sum, 0)


      const handleDelete=(item)=>{
            // console.log(item)
            Swal.fire({
                  title: 'Are you sure?',
                  text: "Delete This!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {

                        fetch(`https://bistro-boss-server-pink.vercel.app/carts/${item._id}`, {
                              method: 'DELETE',
                            })
                            .then(res => res.json()) // or res.json()
                            .then(res =>{
                              if(res.deletedCount >=1) {

                                    Swal.fire(
                                          'Deleted!',
                                          'Your cart has been deleted.',
                                          'success'
                                        )
                                        refetch();

                              }
                              // console.log(res)
                            }
                              )

                  
                  }
                })
                    /* Read more about handling dismissals below */
                    
      }
      return (
            <div className='m-3 w-full'>
                  <Helmet>
                        <title>Bisto Boss | mycart</title>

                  </Helmet>

                  <div className=' font-semibold flex justify-between items-center h-10 m-2'>
                        <h3 className="text-2xl">Total Items:{cart.length
                        }</h3>
                        <h3 className="text-2xl">Total Price:${total
                        }</h3>
                        <Link to='/dashboard/payment'><button className='btn btn-warning btn-sm p-2 m-2'>Pay</button></Link>
                  </div>

                  <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                              {/* head */}
                              <thead>
                                    <tr>
                                          <th>
                                                #
                                          </th>
                                          <th>Food</th>
                                          <th>Item Name</th>
                                          <th>Price</th>
                                          <th>Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                   {
                                    cart.map((data,index)=>
                                          <tr>
                                          <th>
                                                {index+1}
                                          </th>
                                          <td>
                                                <div className="flex items-center space-x-3">
                                                      <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                  <img src={data.image}alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                      </div>
                                                      
                                                </div>
                                          </td>
                                          <td>
                                          <div>
                                                            <div className="font-bold">{data.name}</div>
                                                            
                                                      </div>
                                          </td>
                                          <td>
                                          <div className="text-sm opacity-50">{data.price}</div>
                                                <br />
                                               
                                          </td>
                                          <td ><button onClick={()=>handleDelete(data)}><AiFillDelete className='bg-red-800  rounded-sm w-[100%] h-8 mx-auto '/></button></td>
                                          
                                    </tr>

                                    
                                          
                                          
                                          )
                                   }
                                   
                              </tbody>
                              {/* foot */}
                             

                        </table>
                  </div>


            </div>
      );
};

export default Mycart;