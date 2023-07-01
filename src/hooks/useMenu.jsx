import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useMenu = () => {
  // const [menu, menuSet] = useState();
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //       fetch('https://bistro-boss-server-pink.vercel.app/menu')
  //             .then(res => res.json())
  //             .then(data => {

  //             //      console.log(data)
  //                   menuSet(data)
  //                  return setLoading(false)
  //             })

  // }, [])
  // // console.log(menu)
  // return [menu, loading]
  const { data: menu = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {

      const res = await fetch('https://bistro-boss-server-pink.vercel.app/menu')
      return res.json();
    }


  })
  return [menu, loading, refetch];

}
export default useMenu;