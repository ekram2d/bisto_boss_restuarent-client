import React from 'react';
import NewSectionTitle from '../../../Components/NewSectionTitle';
import useMenu from '../../../hooks/useMenu';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
      const [menu,loading,refetch] = useMenu();
      const [axiosSecure] = useAxiosSecure();
      // console.log('re',refetch);

      const handleDelete=(item)=>{
      //      console.log(item);
            Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                 
                  console.log(item._id)
                  axiosSecure.delete(`/menu/${item._id}`)
                  .then(res=>{
                        if(res.data.deletedCount > 0){
                              refetch()
                              Swal.fire(
                                    'Deleted!',
                                    'Your menu item is  deleted.',
                                    'success'
                                  )
                        }
                       
                  })
                  console.log(item)

                  }
                })
      }
      return (
            <div className='w-full mt-10'>
                  <NewSectionTitle heading="Mangae All Items" subHeading="Hurry Up"></NewSectionTitle>

                  <h1>{menu.length}</h1>
                  <div className="overflow-x-auto overflow-y-auto">
                        <table className="table w-full">
                              {/* head */}
                              <thead>
                                    <tr>
                                          <th>
                                                #
                                          </th>
                                          <th>Item Image</th>
                                          <th>Item Name</th>
                                          <th>Price</th>
                                          <th>Action</th>
                                          <th>Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {/* row 1 */}
                                    {
                                          menu?.map((item, index) =>

                                                <tr key={item._id}>
                                                      <th>
                                                            {index + 1}
                                                      </th>
                                                      <td>
                                                            <div className="flex items-center space-x-3">
                                                                  <div className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                              <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                  </div>

                                                            </div>
                                                      </td>
                                                      <td>
                                                            <p>{item.name}</p>
                                                      </td>
                                                      <td>
                                                            <p>{item.price}</p>
                                                      </td>
                                                      <td>Purple</td>
                                                      <th>
                                                      <td ><button onClick={()=>handleDelete(item)}><AiFillDelete className='bg-red-800  rounded-sm w-[100%] h-8 mx-auto '/></button></td>
                                                      </th>
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

export default ManageItems;