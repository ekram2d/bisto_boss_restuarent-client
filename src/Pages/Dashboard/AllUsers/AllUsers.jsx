import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
      const [axiosSecure]  = useAxiosSecure();
      const { data: users = [], refetch } = useQuery(['users'], async () => {

            const res = await axiosSecure.get('/users')
            return res.data;
      })
      const handleDelete = () => {

      }
      const handleMakeAdmin=(user)=>{
            // console.log(id);
           fetch(`https://bistro-boss-server-pink.vercel.app/users/admin/${user._id}`,{
            method:'PATCH'
           })
           .then(res=>res.json())
           .then(data=>{
            if(data.modifiedCount){
                  refetch();
                  Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin  Now`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                      
            }
           })
      }
      return (
            // todo helemt baki ache
            <div className='w-full'>
                  <h3 className='text-3xl font-semibold my-4 text-center'>Total Users:  {users.length}</h3>
                  <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                              {/* head */}
                              <thead>
                                    <tr>
                                          <th>#</th>
                                          <th>Name</th>
                                          <th>Email</th>
                                          <th>Role</th>
                                          <th>Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {/* row 1 */}
                                    {
                                          users.map((user, index) => <tr key={user._id}>
                                                <th>{index + 1}</th>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td><th>{
                                                      user.role == 'admin' ? 'admin' :
                                                     <button onClick={()=>handleMakeAdmin(user)} className='bg-orange-700  rounded-sm w-[100%] h-8 mx-auto btn btn-ghost' ><FaUserShield></FaUserShield></button>       

                                                }</th></td>
                                                <td ><button className='bg-red-700  rounded-sm h-8 mx-auto btn btn-ghost ' onClick={() => handleDelete(user)} ><AiFillDelete className='  rounded-sm  h-8 mx-auto  ' /></button></td>
                                          </tr>)
                                    }

                              </tbody>
                        </table>
                  </div>

            </div>
      );
};

export default AllUsers;