import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { data } from 'autoprefixer';
import useAxiosSecure from './useAxiosSecure';
const useCart = () => {
      const { user , loading } = useContext(AuthContext);
      const token = localStorage.getItem('access-token');
      const [axiosSecure] = useAxiosSecure();
      const { isLoading, isError, refetch, data: cart = [], error } = useQuery({
            queryKey: ['carts', user?.email],
            enabled: !loading,
            // queryFn: async () => {

            //       const response = await fetch(`https://bistro-boss-server-pink.vercel.app/carts?email=${user?.email}`, {
            //             headers: {
            //                   authorization: `bearer ${token}`
            //             }
            //       })
            //       return response.json()
            // },
            queryFn: async () => {

                  const res = await axiosSecure(`/carts?email=${user?.email}`)

                  // console.log('rest from axioa',res)
                  return res.data;
            },
      })
      return [cart, refetch];

}


export default useCart;