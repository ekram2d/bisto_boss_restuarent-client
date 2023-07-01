import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import NewSectionTitle from '../../../Components/NewSectionTitle';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddItem = () => {
      const [axiosSecure] = useAxiosSecure();
      const { register, handleSubmit, watch, formState: { errors } } = useForm();
      const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
      // console.log(img_hosting_url)
      const onSubmit = data => {

            console.log(data);
            const formData = new FormData();
            formData.append('image', data.image[0])
            fetch(img_hosting_url, {


                  method: 'POST',
                  body: formData
            })
                  .then(res => res.json())
                  .then(imgResponse => {
                        if(imgResponse.success){
                              const imgURL = imgResponse.data.display_url
                              const {name,price,category,recipe} =data;
                              // const _id='';
                              const newItem ={name,price:parseFloat(price),category,recipe,image:imgURL};
                              console.log(newItem);
                              axiosSecure.post('/menu',newItem)
                              .then(data=>{
                                    console.log('after posting new menuw item ',data.data)
                                    if(data.data.insertedId){
                                          Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'You successfully insert new item ',
                                                showConfirmButton: false,
                                                timer: 1500
                                              })
                                    }
                              })

                        }
                  })
      }
      console.log(errors);
      // console.log(img_hosting_token)
      return (
            <div className='w-full p-10 mb-4'>

                  <NewSectionTitle subHeading="what's new" heading="Add an item"></NewSectionTitle>
                  {/* <SectionTitle ></SectionTitle> */}
                  <form onSubmit={handleSubmit(onSubmit)} >
                        <div class="form-control w-full ">
                              <label class="label">
                                    <span class="label-text">Recipe Name*</span>

                              </label>
                              <input type="text" placeholder="Recipe Name"  {...register("name", { required: true, maxLength: 120 })} className='input input-bordered w-full ' />

                        </div>

                        <div class="form-control w-full ">
                              <label class="label">
                                    <span class="label-text">Category*</span>

                              </label>
                              <select defaultValue="Pick one" class="select select-bordered" {...register("category", { required: true })} required>
                                    <option disabled >Pick one</option>
                                    <option>Pizza</option>
                                    <option>Soup</option>
                                    <option>Salad</option>
                                    <option>Drinks</option>
                                    <option>Dessert</option>
                              </select>

                        </div>
                        <div class="form-control w-full ">
                              <label class="label">
                                    <span class="label-text">Price*</span>

                              </label>
                              <input type="number" placeholder="Type here" class="input input-bordered w-full " {...register("price", { required: true, maxLength: 120 })} required />

                        </div>

                        <div class="form-control">
                              <label class="label">
                                    <span class="label-text">Recipe Details*</span>

                              </label>
                              <textarea {...register("recipe", { required: true, maxLength: 120 })} class="textarea textarea-bordered h-24" placeholder="" required></textarea >

                        </div>


                        <div class="form-control w-full ">
                              <label class="label">
                                    <span class="label-text">Item Image*</span>

                              </label>
                              <input
                                type="file"
                                className="file-input file-input-primary w-full"
                                { ...register("image") }
                            />
                        </div>

                        <input className='btn btn-sm mt-4 ' type='submit' value="Add Item"></input>
                  </form>

            </div>
      );
};

export default AddItem;